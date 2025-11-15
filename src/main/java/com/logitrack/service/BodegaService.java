package com.logitrack.service;

import com.logitrack.model.Bodega;
import java.util.List;

public interface BodegaService {
    List<Bodega> findAll();
    Bodega findById(Long id);
    Bodega save(Bodega bodega);
    void deleteById(Long id);
}
