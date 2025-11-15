package com.logitrack.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.logitrack.dto.ProductoBodegaDTO;
import com.logitrack.model.ProductoBodega;
import com.logitrack.model.ProductoBodegaPK;

@Repository
public interface ProductoBodegaRepository extends JpaRepository<ProductoBodega, ProductoBodegaPK> {

    @Query("""
        SELECT new com.logitrack.dto.ProductoBodegaDTO(
            p.id, p.nombre, pb.stock
        )
        FROM ProductoBodega pb
        JOIN pb.producto p
        WHERE pb.bodega.id = :bodegaId
    """)
    List<ProductoBodegaDTO> listarProductosPorBodega(Long bodegaId);
}
