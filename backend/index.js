import express from "express";
import { supabase } from "./lib/supabase.js";


const app = express();
app.use(express.json());



app.get('/', async (request, response) =>{
    const {data, error} = await supabase
    .from('equipment')
    .select()

    response.json(data)
});

app.get('/api/data', (request, response) =>{
    response.json(data)
});

const PORT = 3001
app.listen(PORT, () =>{
    console.log(`Server running on ${PORT}`)
});