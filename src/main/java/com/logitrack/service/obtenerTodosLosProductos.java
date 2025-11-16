package com.logitrack.service;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class obtenerTodosLosProductos {

    @Autowired
    private JdbcTemplate jdbc;

    public List<Map<String, Object>> obtenerTodosLosProductos() {
        try {
            return jdbc.queryForList("SELECT * FROM vista_productos_con_stock");
        } catch (Exception e) {
            throw new RuntimeException("Error consultando productos", e);
        }
    }
}
