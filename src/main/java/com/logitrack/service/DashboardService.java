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

        public Map<String, Object> obtenerDashboardInfo(String usuario, String rol) {
                Map<String, Object> respuesta = new HashMap<>();
                List<Map<String, Object>> stockPorBodega;

                if (rol.equalsIgnoreCase("admin")) {
                        stockPorBodega = jdbc.queryForList(
                                        "SELECT b.id, b.nombre AS bodega, b.ubicacion AS ciudad, SUM(pb.stock) AS total_stock "
                                                        +
                                                        "FROM producto_bodega pb " +
                                                        "JOIN bodega b ON b.id = pb.bodega_id " +
                                                        "GROUP BY b.id, b.nombre, b.ubicacion " +
                                                        "ORDER BY b.nombre");
                } else {
                        stockPorBodega = jdbc.queryForList(
                                        "SELECT b.id, b.nombre AS bodega, b.ubicacion AS ciudad, SUM(pb.stock) AS total_stock "
                                                        +
                                                        "FROM producto_bodega pb " +
                                                        "JOIN bodega b ON b.id = pb.bodega_id " +
                                                        "JOIN empleado_bodega eb ON eb.bodega_id = b.id " +
                                                        "JOIN usuario u ON u.id = eb.empleado_id " +
                                                        "WHERE u.username = ? " +
                                                        "GROUP BY b.id, b.nombre, b.ubicacion " +
                                                        "ORDER BY b.nombre",
                                        usuario);
                }

                respuesta.put("stockPorBodega", stockPorBodega);
                System.out.println(respuesta);
                return respuesta;
        }
}
