import express from "express";
import { supabase } from "./lib/supabase.js";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors());


//Get full equipment data
app.get('/api/equipment', async(req, res) =>{
    const {data, error} = await supabase
    .from('equipments')
    .select("*")
    if (error) return res.status(500).json({ error });
    res.json(data)
})

//Get full location data for data validation
app.get('/api/locations', async(req, res) =>{
    const {data, error} = await supabase
    .from('locations')
    .select("*")
    if (error) return res.status(500).json({ error });
    res.json(data)
})

//Add new items
app.post('/api/equipment', async(req,res) =>{
    const { model, equipment_type } = req.body;
    const {error} = await supabase
    .from('equipments')
    .insert(req.body)
    if (error) return res.status(500).json({ error });

    if (!model || model.trim() === '') {
    return res.status(400).json({ error: 'Model is required' });
  }
  if (!equipment_type || equipment_type.trim() === '') {
    return res.status(400).json({ error: 'Equipment type is required' });
  }

    return res.status(201).json({ message: "Equipment added" });

})


//Update equipments
app.put('/api/equipment/:id', async (req, res) => {
  const { id } = req.params;
  const { model, equipment_type, location } = req.body;

  if (!model?.trim()) {
    return res.status(400).json({ error: 'Model is required' });
  }

  if (!equipment_type?.trim()) {
    return res.status(400).json({ error: 'Equipment type is required' });
  }

  const { error } = await supabase
    .from('equipments')
    .update({ model, equipment_type, location }) 
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ message: 'Updated successfully' });
});


// Delete items
app.delete('/api/equipment/:id', async(req, res) =>{
    const id = req.params.id
    const response = await supabase
    .from('equipments')
    .delete()
    .eq('id', id)
    return res.status(201).json({ message: "deleted" });
});



const PORT = 3001
app.listen(PORT, () =>{
    console.log(`Server running on ${PORT}`)
});

