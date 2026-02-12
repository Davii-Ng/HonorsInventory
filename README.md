# Honors Inventory Management System

Equipment tracking with React, Express, and PostgreSQL.

## Setup

1. **Database**:  Create Supabase project, run `init.SQL` in Supabase, disable RLS
2. **Backend**: `cd backend && npm install && npm run start`
3. **Frontend**: `cd frontend && npm install && npm run dev`

Create `backend/.env`:
```
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
```
Notes:\
Supabase only allows 2 free projects, so consider using a different account if you have already used up the two free projects

To get your keys, go to dashboard -> hover your cursor to the left -> find Project Settings then: 

SUPABASE URL is in the Data API section\
SUPABASE_ANON_KEY: go to API Keys, select Legacy anon, service_role API keys



Create `frontend/.env`:
VITE_API_URL = http://localhost:3001

If everything goes well it should be looking something like this:
![alt text](image-1.png)

## Features
- View all equipment with current locations
- Add new equipment (auto-assigned to warehouse)
- Edit equipment and transfer between locations
- Delete equipment
- Search/filter equipment by model, type, or location
- Input validation on frontend and backend

## Database Schema
- **locations** - Room inventory (warehouse, classrooms, offices)
  - `id` (PRIMARY KEY)
  - `room_name` (UNIQUE)
  - `building_type` (CHECK: Classroom, Office, Warehouse)
- **equipments** - Equipment items with foreign key to locations
  - `id` (PRIMARY KEY)
  - `model`, `equipment_type`
  - `location_id` (FOREIGN KEY → locations.id)

## API Endpoints
- `GET /api/equipment` - Get all equipment with location details
- `GET /api/locations` - Get all locations
- `POST /api/equipment` - Add new equipment
- `PUT /api/equipment/:id` - Update equipment
- `DELETE /api/equipment/:id` - Delete equipment

## Tech Stack
React + TypeScript | Express | Supabase (PostgreSQL)


Changes: 
1. Fixed SQL table/column naming inconsistencies
2. Changed foreign key from TEXT (`location` → `room_name`) to INTEGER (`location_id` → `locations.id`)
3. Added input validation on both frontend and backend
4. A search bar that is still in progress, but functional