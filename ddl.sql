-- Tabla de categoría
CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de usuarios
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    rol VARCHAR(20) NOT NULL -- 'ADMIN' o 'EMPLEADO'
);

-- Tabla de bodegas
CREATE TABLE bodega (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(200) NOT NULL,
    capacidad INT NOT NULL,
    encargado_id INT REFERENCES usuario(id)
);


CREATE TABLE producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria int NOT null references categoria(id),
    precio DECIMAL(10,2) NOT NULL
);

-- Relación bodega-producto: stock por producto en cada bodega
CREATE TABLE producto_bodega (
    bodega_id INT REFERENCES bodega(id) ON DELETE CASCADE,
    producto_id INT REFERENCES producto(id),
    stock INT NOT NULL DEFAULT 0,
    PRIMARY KEY (bodega_id, producto_id)
);

-- Tabla de entradas de inventario
CREATE TABLE entrada (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL,
    usuario_id INT REFERENCES usuario(id),
    bodega_id INT REFERENCES bodega(id)
);

CREATE TABLE entrada_detalle (
    entrada_id INT REFERENCES entrada(id) ON DELETE CASCADE,
    producto_id INT REFERENCES producto(id),
    cantidad INT NOT NULL,
    PRIMARY KEY (entrada_id, producto_id)
);

-- Tabla de salidas de inventario
CREATE TABLE salida (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL,
    usuario_id INT REFERENCES usuario(id),
    bodega_id INT REFERENCES bodega(id)
);

CREATE TABLE salida_detalle (
    salida_id INT REFERENCES salida(id) ON DELETE CASCADE,
    producto_id INT REFERENCES producto(id),
    cantidad INT NOT NULL,
    PRIMARY KEY (salida_id, producto_id)
);

-- Tabla de transferencias
CREATE TABLE transferencia (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL,
    usuario_id INT REFERENCES usuario(id),
    bodega_origen_id INT REFERENCES bodega(id),
    bodega_destino_id INT REFERENCES bodega(id)
);

CREATE TABLE transferencia_detalle (
    transferencia_id INT REFERENCES transferencia(id) ON DELETE CASCADE,
    producto_id INT REFERENCES producto(id),
    cantidad INT NOT NULL,
    PRIMARY KEY (transferencia_id, producto_id)
);

-- Tabla de auditoría
CREATE TABLE auditoria (
    id SERIAL PRIMARY KEY,
    entidad VARCHAR(50) NOT NULL,
    operacion VARCHAR(10) NOT NULL, -- INSERT/UPDATE/DELETE
    fecha TIMESTAMP NOT NULL,
    usuario_id INT REFERENCES usuario(id),
    valores_anteriores TEXT,
    valores_nuevos TEXT
);

CREATE TABLE empleado_bodega (
    empleado_id INT REFERENCES usuario(id),
    bodega_id INT REFERENCES bodega(id),
    PRIMARY KEY (empleado_id, bodega_id)
);

CREATE OR REPLACE VIEW vista_productos_con_stock AS
SELECT 
    p.id,
    p.nombre,
    c.nombre AS categoria,
    p.precio,
    COALESCE(SUM(pb.stock), 0) AS stock_total
FROM producto p
LEFT JOIN categoria c ON c.id = p.categoria
LEFT JOIN producto_bodega pb ON pb.producto_id = p.id
GROUP BY p.id, p.nombre, c.nombre, p.precio
ORDER BY p.nombre;


-- Inserts categorías
INSERT INTO categoria (nombre) VALUES
('Electrónica'),
('Alimentos'),
('Ropa'),
('Hogar'),
('Juguetes');

-- Inserts usuarios
-- Inserts usuarios con contraseñas encriptadas (BCrypt)
INSERT INTO usuario (username, password, nombre, rol) VALUES
('admin1', '$2a$10$zlkFqGuJezDBtbXtu6nZOukrkcCOWxTkD6RxzgGrO8H0CDcHUm1SS', 'Ana Perez', 'ADMIN');


-- Inserts bodegas
INSERT INTO bodega (nombre, ubicacion, capacidad, encargado_id) VALUES
('Bodega 1', 'Ciudad A', 1000, 1),
('Bodega 2', 'Ciudad B', 800, 2),
('Bodega 3', 'Ciudad C', 1200, 3),
('Bodega 4', 'Ciudad D', 600, 4),
('Bodega 5', 'Ciudad E', 1500, 5);


-- Inserts productos (20 productos base)
INSERT INTO producto (nombre, categoria, precio) VALUES
('Televisor', 1, 499.99),
('Radio', 1, 39.99),
('Laptop', 1, 899.99),
('Smartphone', 1, 699.99),
('Tablet', 1, 299.99),
('Arroz', 2, 1.20),
('Frijoles', 2, 0.99),
('Azúcar', 2, 0.80),
('Aceite', 2, 3.50),
('Leche', 2, 1.00),
('Camisa', 3, 15.00),
('Pantalón', 3, 20.00),
('Zapatos', 3, 45.00),
('Chaqueta', 3, 60.00),
('Gorra', 3, 10.00),
('Sofá', 4, 250.00),
('Mesa', 4, 120.00),
('Silla', 4, 50.00),
('Lámpara', 4, 35.00),
('Juguete de peluche', 5, 12.00);

-- Asignar productos a bodegas con stock (productos pueden repetirse)
INSERT INTO producto_bodega (bodega_id, producto_id, stock) VALUES
-- Bodega 1
(1, 1, 10),(1, 2, 15),(1, 3, 8),(1, 4, 20),(1, 5, 12),(1, 6, 30),(1, 7, 25),(1, 8, 40),(1, 9, 50),(1, 10, 45),
(1, 11, 14),(1, 12, 12),(1, 13, 18),(1, 14, 10),(1, 15, 28),(1, 16, 7),(1, 17, 5),(1, 18, 20),(1, 19, 10),(1, 20, 15),
-- Bodega 2
(2, 1, 7),(2, 2, 14),(2, 3, 5),(2, 4, 18),(2, 5, 20),(2, 6, 23),(2, 7, 29),(2, 8, 35),(2, 9, 48),(2, 10, 50),
(2, 11, 17),(2, 12, 15),(2, 13, 14),(2, 14, 11),(2, 15, 24),(2, 16, 6),(2, 17, 4),(2, 18, 21),(2, 19, 14),(2, 20, 18),
-- Bodega 3
(3, 1, 12),(3, 2, 10),(3, 3, 15),(3, 4, 22),(3, 5, 17),(3, 6, 35),(3, 7, 20),(3, 8, 30),(3, 9, 42),(3, 10, 44),
(3, 11, 18),(3, 12, 13),(3, 13, 16),(3, 14, 9),(3, 15, 20),(3, 16, 11),(3, 17, 22),(3, 18, 18),(3, 19, 7),(3, 20, 10),
-- Bodega 4
(4, 1, 5),(4, 2, 8),(4, 3, 11),(4, 4, 25),(4, 5, 19),(4, 6, 20),(4, 7, 22),(4, 8, 27),(4, 9, 36),(4, 10, 38),
(4, 11, 9),(4, 12, 7),(4, 13, 14),(4, 14, 12),(4, 15, 15),(4, 16, 10),(4, 17, 8),(4, 18, 13),(4, 19, 11),(4, 20, 12),
-- Bodega 5
(5, 1, 14),(5, 2, 20),(5, 3, 18),(5, 4, 30),(5, 5, 22),(5, 6, 40),(5, 7, 32),(5, 8, 45),(5, 9, 50),(5, 10, 47),
(5, 11, 20),(5, 12, 17),(5, 13, 19),(5, 14, 16),(5, 15, 25),(5, 16, 12),(5, 17, 10),(5, 18, 20),(5, 19, 14),(5, 20, 18);




INSERT INTO empleado_bodega (empleado_id, bodega_id)
VALUES 
(3, 1),
(3, 2),
(3, 4),
(4, 1),
(5, 1);


select * from usuario;
select * from  bodega;
select * from empleado_bodega;

