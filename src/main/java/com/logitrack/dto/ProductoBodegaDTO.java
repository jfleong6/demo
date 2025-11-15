package com.logitrack.dto;

public class ProductoBodegaDTO {

    private Long idProducto;
    private String nombre;
    private Integer stock;

    public ProductoBodegaDTO(Long idProducto, String nombre, Integer stock) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.stock = stock;
    }


    public Long getId() { return idProducto; }
    public String getNombre() { return nombre; }
    public int getStock() { return stock; }
}
