import express from "express";
import { supabase } from "./lib/supabase.js";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors());


//Get full data from equipment
app.get('/api/equipment', async(req, res) =>{
    const {data, error} = await supabase
    .from('equipment')
    .select()
    if (error) return res.status(500).json({ error });
    res.json(data)
})

app.get('/api/locations', async(req, res) =>{
    let message = {message: "ok"}
    res.json(message)
})


app.post('/api/equipment', async(req,res) =>{
    let message = {message: "ok"}
    res.json(message)
})

app.put('/api/equipment/:id', async(req, res) =>{
    let message = {message: "ok"}
    res.json(message)
})

app.delete('/api/equipment/:id', async(req, res) =>{
    let message = {message: "ok"}
    res.json(message)
})



const PORT = 3001
app.listen(PORT, () =>{
    console.log(`Server running on ${PORT}`)
});