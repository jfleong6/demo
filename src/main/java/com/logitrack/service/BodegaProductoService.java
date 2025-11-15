package com.logitrack.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BodegaProductoService {

    private final JdbcTemplate jdbc;

    public BodegaProductoService(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Map<String, Object>> obtenerProductosPorBodega(int bodegaId) {

        String sql =
                "SELECT p.id, p.nombre, pb.stock " +
                "FROM producto_bodega pb " +
                "JOIN producto p ON p.id = pb.producto_id " +
                "WHERE pb.bodega_id = ? " +
                "ORDER BY p.nombre";

        return jdbc.queryForList(sql, bodegaId);
    }
}
