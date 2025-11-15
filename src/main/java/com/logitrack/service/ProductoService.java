package com.logitrack.service;

import com.logitrack.model.Producto;
import java.util.List;

public interface ProductoService {
    List<Producto> findAll();
    Producto findById(Long id);
    Producto save(Producto producto);
    void deleteById(Long id);
}
