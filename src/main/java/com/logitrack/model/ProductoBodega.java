package com.logitrack.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "producto_bodega")
@Getter
@Setter
@IdClass(ProductoBodegaPK.class) // Clave primaria compuesta
public class ProductoBodega {

    @Id
    @ManyToOne
    @JoinColumn(name = "bodega_id")
    private Bodega bodega;

    @Id
    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    @Column(nullable = false)
    private Integer stock;
}

