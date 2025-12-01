import express from "express";
import { supabase } from "./lib/supabase.js";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors());


//Get full equipment data
app.get('/api/equipment', async(req, res) =>{
    const {data, error} = await supabase
    .from('equipment')
    .select("*")
    if (error) return res.status(500).json({ error });
    res.json(data)
})

//Get full location data
app.get('/api/locations', async(req, res) =>{
    const {data, error} = await supabase
    .from('location')
    .select("*")
    if (error) return res.status(500).json({ error });
    res.json(data)
})

//Add new items
app.post('/api/equipment', async(req,res) =>{
    console.log(req.body)
    const {error} = await supabase
    .from('equipment')
    .insert(req.body)
    if (error) return res.status(500).json({ error });
    return res.status(201).json({ message: "Equipment added" });

})


//Update equipments
app.put('/api/equipment/:id', async(req, res) =>{
    const id = req.params.id
    const {error} = await supabase
    .from('equipment')
    .update(req.body)
    .eq('id', id)
    if (error) return res.status(500).json({ error });
    return res.status(201).json({ message: "updated" });
})


// Delete items
app.delete('/api/equipment/:id', async(req, res) =>{
    const id = req.params.id
    const response = await supabase
    .from('equipment')
    .delete()
    .eq('id', id)
    return res.status(201).json({ message: "deleted" });
});



const PORT = 3001
app.listen(PORT, () =>{
    console.log(`Server running on ${PORT}`)
});

