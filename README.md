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

Create `frontend/.env`:
VITE_API_URL = http://localhost:3001

## Features
View, add, edit, delete, and transfer equipment between locations.

## Tech
React + TypeScript | Express | PostgreSQL (Supabase)