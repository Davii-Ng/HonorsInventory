# Honors Inventory Management System

Equipment tracking with React, Express, and PostgreSQL.

## Setup

1. **Database**:  Create Supabase project, run `init.SQL` in Supabase, disable RLS
2. **Backend**: `cd backend && npm install && npm start`
3. **Frontend**: `cd frontend && delete node_modules && npm install && npm run dev`

Create `backend/.env`:
```
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
```
Notes: 
Supabase only allows 2 free projects, so consider using a different account if you have already used up the two free projects. 
To get your keys, go to dashboard -> hover your cursor to the left -> find Project Settings then: 

SUPABASE URL is in the Data API section
SUPABASE_ANON_KEY: go to API Keys, select Legacy anon, service_role API keys



Create `frontend/.env`:
VITE_API_URL = http://localhost:3001

If everything goes well it should be looking something like this:
![alt text](image.png)

## Features
View, add, edit, delete, and transfer equipment between locations.

## Tech
React + TypeScript | Express | PostgreSQL (Supabase)