import express from "express";
import { supabase } from "./lib/supabase.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());



//Get full equipment data with JOIN
app.get('/api/equipment', async(req, res) => {
    const {data, error} = await supabase
    .from('equipments')
    .select(`
        *,
        locations (
            id,
            room_name,
            building_type
        )
    `)
    if (error) return res.status(500).json({ error });
    res.json(data)
})


app.get('/api/locations', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('locations')
            .select('*');
        
        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ error: error.message });
        }
        
        return res.json(data);
    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
});


//Get full location data
app.get('/api/equipment', async(req, res) => {
    const {data, error} = await supabase
    .from('equipments')
    .select(`
        *,
        locations (
            id,
            room_name,
            building_type
        )
    `)
    if (error) return res.status(500).json({ error });
    res.json(data)
})

//Add new items (auto-assign warehouse)
app.post('/api/equipment', async(req, res) => {
    const { model, equipment_type } = req.body;
    
    // Validate first
    if (!model || model.trim() === '') {
        return res.status(400).json({ error: 'Model is required' });
    }
    if (!equipment_type || equipment_type.trim() === '') {
        return res.status(400).json({ error: 'Equipment type is required' });
    }

    // Find warehouse
    const { data: warehouse } = await supabase
        .from('locations')
        .select('id')
        .eq('building_type', 'Warehouse')
        .single();

    // Insert with warehouse location_id
    const { error } = await supabase
        .from('equipments')
        .insert({
            model,
            equipment_type,
            location_id: warehouse?.id
        })
    
    if (error) return res.status(500).json({ error });
    return res.status(201).json({ message: "Equipment added" });
})


app.put('/api/equipment/:id', async (req, res) => {
    const { model, equipment_type, location_id } = req.body;
    
    if (!model || model.trim() === '') {
        return res.status(400).json({ error: 'Model is required' });
    }
    if (!equipment_type || equipment_type.trim() === '') {
        return res.status(400).json({ error: 'Equipment type is required' });
    }
    if (location_id && isNaN(location_id)) {
        return res.status(400).json({ error: 'Invalid location' });
    }

    const { error } = await supabase
        .from('equipments')
        .update({ model, equipment_type, location_id })
        .eq('id', req.params.id);

    if (error) return res.status(500).json({ error });
    res.status(200).json({ message: "updated" });
});

// Delete items
app.delete('/api/equipment/:id', async(req, res) => {
    const { error } = await supabase
        .from('equipments')
        .delete()
        .eq('id', req.params.id)
    
    if (error) return res.status(500).json({ error });
    return res.status(200).json({ message: "deleted" });
});

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});