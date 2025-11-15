package com.logitrack.model;

import java.io.Serializable;
import java.util.Objects;

public class ProductoBodegaPK implements Serializable {

    private Long bodega;
    private Long producto;

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
