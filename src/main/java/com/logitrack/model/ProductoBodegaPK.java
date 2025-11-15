package com.logitrack.model;

import java.io.Serializable;
import java.util.Objects;

public class ProductoBodegaPK implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long bodega;
    private Long producto;

    // Constructor vacío (obligatorio)
    public ProductoBodegaPK() {}

    // Constructor completo (útil)
    public ProductoBodegaPK(Long bodega, Long producto) {
        this.bodega = bodega;
        this.producto = producto;
    }

    public Long getBodega() {
        return bodega;
    }

    public void setBodega(Long bodega) {
        this.bodega = bodega;
    }

    public Long getProducto() {
        return producto;
    }

    public void setProducto(Long producto) {
        this.producto = producto;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProductoBodegaPK)) return false;
        ProductoBodegaPK that = (ProductoBodegaPK) o;
        return Objects.equals(bodega, that.bodega) &&
               Objects.equals(producto, that.producto);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bodega, producto);
    }
}
