CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  room_name TEXT UNIQUE NOT NULL,
  building_type TEXT NOT NULL CHECK (building_type IN ('Classroom', 'Office', 'Warehouse'))
);


CREATE TABLE equipments (
  id SERIAL PRIMARY KEY,
  model TEXT NOT NULL,
  equipment_type TEXT NOT NULL,
  location_id INTEGER REFERENCES locations(id) ON DELETE SET NULL
);

-- Insert locations across 6 floors
INSERT INTO locations (room_name, building_type) VALUES
  -- Warehouse
  ('HON Warehouse', 'Warehouse'),
  
  -- Floor 1
  ('HON 1001', 'Classroom'),
  ('HON 1010', 'Classroom'),
  ('HON 1015A', 'Office'),
  ('HON 1015B', 'Office'),
  ('HON 1020', 'Classroom'),
  
  -- Floor 2
  ('HON 2001', 'Classroom'),
  ('HON 2010', 'Classroom'),
  ('HON 2015', 'Office'),
  ('HON 2020A', 'Office'),
  ('HON 2020B', 'Office'),
  ('HON 2025', 'Classroom'),
  
  -- Floor 3
  ('HON 3001', 'Classroom'),
  ('HON 3002', 'Classroom'),
  ('HON 3003', 'Classroom'),
  ('HON 3010', 'Classroom'),
  ('HON 3017', 'Classroom'),
  ('HON 3020', 'Classroom'),
  ('HON 3025', 'Classroom'),
  ('HON 3032', 'Classroom'),
  ('HON 3044', 'Classroom'),
  
  -- Floor 4
  ('HON 4010A', 'Office'),
  ('HON 4010B', 'Office'),
  ('HON 4012', 'Office'),
  ('HON 4015B', 'Office'),
  ('HON 4020A', 'Office'),
  ('HON 4021A', 'Office'),
  ('HON 4021B', 'Office'),
  ('HON 4100', 'Office'),
  ('HON 4102', 'Office'),
  
  -- Floor 5
  ('HON 5001', 'Classroom'),
  ('HON 5010', 'Classroom'),
  ('HON 5015A', 'Office'),
  ('HON 5015B', 'Office'),
  ('HON 5020', 'Office'),
  ('HON 5025', 'Classroom'),
  
  -- Floor 6
  ('HON 6001', 'Classroom'),
  ('HON 6010', 'Office'),
  ('HON 6015', 'Office'),
  ('HON 6020A', 'Office'),
  ('HON 6020B', 'Office'),
  ('HON 6025', 'Classroom');

-- Insert 60+ equipment items distributed across all locations
INSERT INTO equipments (model, equipment_type, location_id) VALUES
  -- Warehouse (10 items - backup inventory)
  ('Dell XPS 15 - Spare', 'Laptop', 1),
  ('HP Monitor 24" - Spare', 'Monitor', 1),
  ('Logitech Wireless Mouse x5', 'Mouse', 1),
  ('HP Keyboard x5', 'Keyboard', 1),
  ('Canon Printer - Backup', 'Printer', 1),
  ('Epson Projector - Spare', 'Projector', 1),
  ('Webcam Logitech C920 x3', 'Webcam', 1),
  ('Sony Headset x4', 'Headset', 1),
  ('Cables & Adapters Box', 'Accessories', 1),
  ('External Hard Drives x6', 'Storage', 1),

  -- Floor 1 Classrooms (6 items)
  ('Dell Latitude 7420', 'Laptop', 2),
  ('Samsung 32" Display', 'Monitor', 2),
  ('BenQ Projector MW535A', 'Projector', 3),
  ('Apple Magic Keyboard', 'Keyboard', 3),
  ('Logitech MX Master 3', 'Mouse', 6),
  ('HP LaserJet Pro', 'Printer', 6),

  -- Floor 1 Offices (4 items)
  ('MacBook Pro 16"', 'Laptop', 4),
  ('LG 27" UHD', 'Monitor', 4),
  ('Microsoft Surface Mouse', 'Mouse', 5),
  ('Mechanical RGB Keyboard', 'Keyboard', 5),

  -- Floor 2 Classrooms (6 items)
  ('HP EliteBook 840', 'Laptop', 7),
  ('ASUS 27" Monitor', 'Monitor', 7),
  ('Optoma Projector HD146X', 'Projector', 8),
  ('Razer DeathAdder Mouse', 'Mouse', 8),
  ('Corsair K95 Keyboard', 'Keyboard', 12),
  ('Brother Printer HL-L2350DW', 'Printer', 12),

  -- Floor 2 Offices (6 items)
  ('Lenovo ThinkPad X1', 'Laptop', 9),
  ('Dell UltraSharp 27"', 'Monitor', 9),
  ('MacBook Air M2', 'Laptop', 10),
  ('BenQ 24" Gaming Monitor', 'Monitor', 10),
  ('Apple Magic Mouse', 'Mouse', 11),
  ('Logitech K380', 'Keyboard', 11),

  -- Floor 3 Classrooms (12 items - busiest floor)
  ('ASUS ROG Zephyrus', 'Laptop', 13),
  ('ViewSonic 24" Monitor', 'Monitor', 13),
  ('Microsoft Surface Laptop 5', 'Laptop', 14),
  ('Acer 27" IPS', 'Monitor', 14),
  ('HP Spectre x360', 'Laptop', 15),
  ('Samsung 32" 4K', 'Monitor', 15),
  ('Lenovo Yoga 9i', 'Laptop', 16),
  ('LG 34" Ultrawide', 'Monitor', 16),
  ('ViewSonic Projector PA503S', 'Projector', 17),
  ('Epson PowerLite 1795F', 'Projector', 18),
  ('Canon Pixma TR8620', 'Printer', 19),
  ('Epson EcoTank ET-4760', 'Printer', 20),
  ('Razer Kiyo Pro Webcam', 'Webcam', 21),
  ('Logitech C920 Webcam', 'Webcam', 21),

  -- Floor 4 Offices (10 items)
  ('Dell Precision 5570', 'Laptop', 22),
  ('ASUS ProArt 32"', 'Monitor', 22),
  ('HP ZBook Studio', 'Laptop', 23),
  ('Dell P2422H', 'Monitor', 23),
  ('MacBook Pro 14"', 'Laptop', 24),
  ('HP E24 G4', 'Monitor', 24),
  ('Lenovo ThinkPad P1', 'Laptop', 25),
  ('LG 27" 4K', 'Monitor', 25),
  ('Microsoft Surface Laptop 4', 'Laptop', 26),
  ('Samsung 27" Curved', 'Monitor', 26),
  ('Keychron K2 Keyboard', 'Keyboard', 27),
  ('SteelSeries Rival 3 Mouse', 'Mouse', 27),
  ('Das Keyboard 4', 'Keyboard', 28),
  ('Corsair Harpoon RGB', 'Mouse', 28),
  ('HP OfficeJet Pro 9015', 'Printer', 29),
  ('Canon imageCLASS', 'Printer', 30),

  -- Floor 5 (6 items)
  ('Dell XPS 13', 'Laptop', 31),
  ('ASUS 24" Monitor', 'Monitor', 31),
  ('HP Pavilion', 'Laptop', 32),
  ('Acer 22" Monitor', 'Monitor', 32),
  ('Razer BlackWidow Keyboard', 'Keyboard', 33),
  ('Logitech G502 Mouse', 'Mouse', 33),
  ('Microsoft Ergonomic Keyboard', 'Keyboard', 34),
  ('Razer Viper Ultimate', 'Mouse', 35),
  ('BenQ Projector', 'Projector', 36),

  -- Floor 6 (6 items)
  ('MacBook Pro 13"', 'Laptop', 37),
  ('Dell 24" Monitor', 'Monitor', 37),
  ('HP EliteBook 850', 'Laptop', 38),
  ('LG 24" Monitor', 'Monitor', 38),
  ('Sony WH-1000XM5', 'Headset', 39),
  ('Bose QuietComfort 45', 'Headset', 39),
  ('Logitech H390 Headset', 'Headset', 40),
  ('HyperX Cloud II', 'Headset', 41),
  ('Microsoft LifeCam HD', 'Webcam', 42);