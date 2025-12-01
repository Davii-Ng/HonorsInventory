import { useState, useEffect } from "react";


interface Equipment {
  id: number;
  model: string;
  equipment_type: string;
  location: string | null;
}

export default function App(){
  const [item, setItem] = useState<Equipment []>([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editItem,setEditItem] = useState<Equipment|null>(null);
 
  

  const load = async () => {
      try{
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/equipment`)
        console.log('res', res)

        const data: Equipment[] = await res.json()
        console.log('Data: ', data)

        setItem(data)
      } catch (err){
        console.log("Failed to fetch", err);
      }
    };

  // Load data
  useEffect(() => {
    load()
  }, []);

  
  const handleSave = async() =>{
    await fetch(`${import.meta.env.VITE_API_URL}/api/equipment/${editItem?.id}`,{
      method: "PUT",
      headers : {"Content-Type": "application/json"},
      body: JSON.stringify(editItem)
    });


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
    <table>
      <caption>Equipment List</caption>
      <thead>
        <tr>
          <th>Equipment ID</th>
          <th>Model</th>
          <th>Equipment Type</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {item.map((equipment) => ( 
          <tr key = {equipment.id}>
            <th>{equipment.id}</th>
            <th>{equipment.model}</th>
            <th>{equipment.equipment_type}</th>
            <th>{equipment.location}</th>
            <td><button onClick = {() => {
              setEditItem(equipment);  
              setIsModalOpen(true);
              }}>Edit</button></td>
            <td><button onClick={() =>{handleDelete(equipment.id)}} >Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    {isModalOpen && (
      <div>
        <div>
          <h2>Edit Equipment</h2>


          <input
          type = "text"
          value = {editItem?.model}
          onChange = {(e) =>
            setEditItem({...editItem, model: e.target.value})
          }
          ></input>

          <input
          type = "text"
          value = {editItem?.equipment_type}
          onChange = {(e) =>
            setEditItem({...editItem, equipment_type: e.target.value})
          }
          ></input>

          <input
          type = "text"
          value = {editItem?.location}
          onChange = {(e) =>
            setEditItem({...editItem, location: e.target.value})
          }
          ></input>

          <button onClick = {handleSave}>Save</button>
          <button onClick = {() => setIsModalOpen(false)}>Cancel</button>
        </div>
      </div>
    )}

    

    <button> Add Equipment</button>
  </div>
)
}
