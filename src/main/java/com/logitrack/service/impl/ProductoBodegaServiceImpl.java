package com.logitrack.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logitrack.dto.ProductoBodegaDTO;
import com.logitrack.repository.ProductoBodegaRepository;
import com.logitrack.service.ProductoBodegaService;

@Service
public class ProductoBodegaServiceImpl implements ProductoBodegaService {

    @Autowired
    private ProductoBodegaRepository repository;

    @Override
    public List<ProductoBodegaDTO> obtenerProductosPorBodega(Long bodegaId) {
        return repository.listarProductosPorBodega(bodegaId);
    }
}

