package com.logitrack.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.logitrack.service.obtenerTodosLosProductos;

@RestController
@RequestMapping("/api")
public class ProductoController {

    @Autowired
    private obtenerTodosLosProductos obtenerTodosLosProductos;

    @GetMapping("/productos-todos")
    public ResponseEntity<List<Map<String, Object>>> obtenerProductos() {
        List<Map<String, Object>> productos = obtenerTodosLosProductos.obtenerTodosLosProductos();
        return ResponseEntity.ok(productos);
    }
}

