package com.logitrack.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class BodegaProductoRepository {

    private final JdbcTemplate jdbc;

    public BodegaProductoRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Map<String, Object>> findProductosByBodega(int id) {

        String sql =
                "SELECT p.id, p.nombre, pb.stock " +
                "FROM producto_bodega pb " +
                "JOIN producto p ON p.id = pb.producto_id " +
                "WHERE pb.bodega_id = ? " +
                "ORDER BY p.nombre";

        return jdbc.queryForList(sql, id);
    }
}
