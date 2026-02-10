
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  room_name TEXT UNIQUE NOT NULL,
  building_type TEXT NOT NULL CHECK (building_type IN ('Classroom', 'Office', 'Warehouse'))
);


CREATE TABLE equipments (
  id SERIAL PRIMARY KEY,
  model TEXT NOT NULL,
  equipment_type TEXT NOT NULL,
  location TEXT REFERENCES locations(room_name) ON DELETE SET NULL
);

INSERT INTO locations (room_name, building_type) VALUES
  ('HON Warehouse', 'Warehouse'),
  ('HON 3017', 'Classroom'),
  ('HON 3025', 'Classroom'),
  ('HON 4015B', 'Office'),
  ('HON 4020A', 'Office'),
  ('HON 3001', 'Classroom'),
  ('HON 3002', 'Classroom'),
  ('HON 3003', 'Classroom'),
  ('HON 3010', 'Classroom'),
  ('HON 3020', 'Classroom'),
  ('HON 3032', 'Classroom'),
  ('HON 3044', 'Classroom'),

  ('HON 4010A', 'Office'),
  ('HON 4010B', 'Office'),
  ('HON 4012', 'Office'),
  ('HON 4021A', 'Office'),
  ('HON 4021B', 'Office'),
  ('HON 4100', 'Office'),
  ('HON 4102', 'Office');


INSERT INTO equipments (model, equipment_type, location) VALUES
  ('HP LaserJet', 'Printer', 'HON 3017'),
  ('Samsung Monitor', 'Monitor', 'HON 3017'),
  ('Canon Printer', 'Printer', 'HON 3025'),
  ('Lenovo ThinkPad', 'Laptop', 'HON 3025'),
  ('Dell Elite8', 'Laptop', 'HON 4015B'),
  ('Apple Magic Mouse', 'Mouse', 'HON 4015B'),
  ('MacBook Pro', 'Laptop', 'HON 4020A'),
  ('Dell Monitor', 'Monitor', 'HON Warehouse'),
  ('Dell Monitor', 'Monitor', 'HON Warehouse'),
  ('Dell Monitor', 'Monitor', 'HON Warehouse'),
  ('Logitech Mouse', 'Mouse', 'HON Warehouse'),
  ('HP Keyboard', 'Keyboard', 'HON Warehouse'),
  ('HP EliteBook', 'Laptop', 'HON Warehouse');