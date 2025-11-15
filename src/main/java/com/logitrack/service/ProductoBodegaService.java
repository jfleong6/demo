package com.logitrack.service;

import java.util.List;

import com.logitrack.dto.ProductoBodegaDTO;

public interface ProductoBodegaService {
    List<ProductoBodegaDTO> obtenerProductosPorBodega(Long bodegaId);
}

