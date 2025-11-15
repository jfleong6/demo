package com.logitrack.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

        private final JdbcTemplate jdbc;

        public DashboardService(JdbcTemplate jdbc) {
                this.jdbc = jdbc;
        }

        public Map<String, Object> obtenerDashboardInfo() {

                Map<String, Object> respuesta = new HashMap<>();

                // Stock por bodega (corregido)
                List<Map<String, Object>> stockPorBodega = jdbc.queryForList(
                                "SELECT b.id, b.nombre AS bodega, b.ubicacion AS ciudad, SUM(pb.stock) AS total_stock "
                                                +
                                                "FROM producto_bodega pb " +
                                                "JOIN bodega b ON b.id = pb.bodega_id " +
                                                "GROUP BY b.id, b.nombre, b.ubicacion " +
                                                "ORDER BY b.nombre");
                respuesta.put("stockPorBodega", stockPorBodega);

                return respuesta;
        }
}
