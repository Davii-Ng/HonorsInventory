import { useState, useEffect } from "react";


interface Equipment {
  id: number;
  model: string;
  equipment_type: string;
  location_id: number;
  locations?: {
    id: number;
    room_name: string;
    building_type: string;
  };
}

interface Location {
  id: number;
  room_name: string;
  building_type: string;
}


export default function App(){
  const [item, setItem] = useState<Equipment []>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem,setEditItem] = useState<Equipment|null>(null);
  const [newItem, setNewItem] = useState({
  model: "",
  equipment_type: ""
}); 
  const [isAddOpen, setIsAddOpen] = useState(false);


  const [location, setLocation] = useState<Location[]>([]);
  const [searchQuery, setSearchQuery] = useState("")

 
  
  // Load data from backend
  const load = async () => {
      try{
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/equipment`)
        

        const data: Equipment[] = await res.json()
        

        setItem(data)

      } catch (err){
        console.log("Failed to fetch", err);
      }
    };

    const fetchLocation = async() =>{
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/locations`)
      const data : Location[] = await res.json()
      setLocation(data);
  }


  useEffect(() => {
    load()
    fetchLocation()
  }, []);


const handleAdd = async () => {
  if (!newItem.model?.trim()) {
    alert('Model is required');
    return;
  }

  if (!newItem.equipment_type?.trim()) {
    alert('Equipment type is required');
    return;
  }

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/equipment`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: newItem.model,
        equipment_type: newItem.equipment_type,
      }),
    }
  );

  const result = await res.json(); 

  if (!res.ok) {
    alert('Add failed: ' + (result.error ?? 'Unknown error'));
    return;   
  }

  setNewItem({
  model: "",
  equipment_type: ""
});

  setIsAddOpen(false);
  load();
};

  
  const handleEdit = async() =>{

    if (!(editItem?.model.trim())) {
    alert('Model is required');
    return;
   }

    if (!(editItem?.equipment_type.trim())) {
      alert('Equipment type is required');
      return;
    }


    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/equipment/${editItem?.id}`,{
      method: "PUT",
      headers : {"Content-Type": "application/json"},
      body: JSON.stringify({
        model: editItem?.model,
        equipment_type: editItem?.equipment_type,
        location: editItem?.location_id
      })
    });

    const result = await res.json();

    if (!res.ok) {
    alert("Update failed: " + result.error?.message);
    return; // stop here if error
  }
    
    setIsModalOpen(false);
    load();
  };


  async function handleDelete(id: number){
    try{
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/equipment/${id}`, {
        method: "DELETE"
      })
      

      if (!res.ok) {
            console.error("Failed to delete");
            return;
          }

    setItem(item.filter(item => item.id !== id))

    } catch(err){
      console.log("Failed to fetch", err)
    }
  }

  return (
  <div>
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="🔍 Search equipment..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}
      />
      {searchQuery && (
        <button 
          onClick={() => setSearchQuery('')}
          style={{ marginLeft: '10px', cursor: 'pointer' }}
        >
          Clear
        </button>
      )}
    </div>
    <table>
      <caption>HONORS INVENTORY</caption>
      <thead>
        <tr>
          <th>Equipment ID</th>
          <th>Model</th>
          <th>Equipment Type</th>
          <th>Location</th>
          <th><button  onClick = {() => setIsAddOpen(true)}> Add Equipment</button></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {item
        .filter((equipment) =>{
          if (!searchQuery) return true;

          const search = searchQuery.toLowerCase();
          const model = equipment.model.toLowerCase() || '';
          const type = equipment.equipment_type?.toLowerCase() || '';
          const location = equipment.locations?.room_name.toLowerCase() || '';

          return model.includes(search) || type.includes(search) || location.includes(search);
        }) 

        .map((equipment) => ( 
          <tr className = "trhover" key = {equipment.id}>
            <td>{equipment.id}</td>
            <td>{equipment.model}</td>
            <td>{equipment.equipment_type}</td>
            <td>{equipment.locations?.room_name || 'No location'}</td>
            <td><button className = "primary" onClick = {() => {
              setEditItem(equipment);  
              setIsModalOpen(true);
              }}>Edit</button></td>
            <td><button className = "primary" onClick={() =>{handleDelete(equipment.id)}} >Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>

    
    {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-container">
      <h2>Edit Equipment</h2>

      <input
        type="text"
        value={editItem?.model}
        onChange={(e) =>
          setEditItem({ ...editItem!, model: e.target.value })
        }
      />

      <input
        type="text"
        value={editItem?.equipment_type}
        onChange={(e) =>
          setEditItem({ ...editItem!, equipment_type: e.target.value })
        }
      />

      <select value = {editItem?.location_id} onChange={(e) =>
          setEditItem({ ...editItem!, location_id: parseInt(e.target.value) })
        }>
        <option value="">-- Select a location --</option>
        {location.map((loc) => (
        <option key={loc.id} value={loc.id}>{loc.room_name}</option>
  ))}
      </select>

      <button className="btn btn-save" onClick={handleEdit}>
        Save
      </button>
      <button className="btn btn-cancel" onClick={() => setIsModalOpen(false)}>
        Cancel
      </button>
    </div>
  </div>
)}




  {isAddOpen && (
    <div className="modal-overlay">
        <div className="modal-container">
        <h2>Add Equipment</h2>

        <input
          type="text"
          placeholder="Model"
          value={newItem.model}
          onChange={(e) => 
            setNewItem({ ...newItem, model: e.target.value })}
        />

        <input
          type="text"
          placeholder="Equipment Type"
          value={newItem.equipment_type}
          onChange={(e) =>
            setNewItem({ ...newItem, equipment_type: e.target.value })
          }
        />

        <button className="btn btn-save" onClick={handleAdd}>Save</button>
        <button className="btn btn-cancel" onClick={() => setIsAddOpen(false)}>Cancel</button>
      </div>
    </div>
)}

  </div>
)
}
