package com.logitrack.service;

import com.logitrack.model.Producto;
import java.util.List;
import java.util.Map;

public interface ProductoService {
    List<Producto> findAll();
    Producto findById(Long id);
    Producto save(Producto producto);
    void deleteById(Long id);
    List<Map<String, Object>> obtenerTodosLosProductos();
}
