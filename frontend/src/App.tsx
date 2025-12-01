import { useState, useEffect } from "react";


interface Equipment {
  id: number;
  model: string;
  equipment_type: string;
  location: string | null;
}

export default function App(){
  const [item, setItem] = useState<Equipment []>([]);

  useEffect(() => {
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
    load()
  }, []);

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
        {item.map((item) => ( 
          <tr key = {item.id}>
            <th>{item.id}</th>
            <th>{item.model}</th>
            <th>{item.equipment_type}</th>
            <th>{item.location}</th>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
}
