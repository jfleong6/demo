package com.logitrack.service.impl;

import com.logitrack.model.Bodega;
import com.logitrack.repository.BodegaRepository;
import com.logitrack.service.BodegaService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BodegaServiceImpl implements BodegaService {

    private final BodegaRepository bodegaRepository;

    public BodegaServiceImpl(BodegaRepository bodegaRepository) {
        this.bodegaRepository = bodegaRepository;
    }

    @Override
    public List<Bodega> findAll() {
        return bodegaRepository.findAll();
    }

    @Override
    public Bodega findById(Long id) {
        return bodegaRepository.findById(id).orElse(null);
    }

    @Override
    public Bodega save(Bodega bodega) {
        return bodegaRepository.save(bodega);
    }

    @Override
    public void deleteById(Long id) {
        bodegaRepository.deleteById(id);
    }
}
