var data;
const acciones = {
  "sec-bodegas": cargarProductosPorBodega,
  "sec-productos": cargarProductos,
  "sec-entradas": cargarEntradas,
  "sec-salidas": cargarSalidas,
  "sec-Transferencia": cargarTransferencias,
  "sec-usuarios": cargarUsuarios
};
async function cargarProductosPorBodega(token) {
  try {
    const response = await fetch("/api/dashboard-info-bodega", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usuario: data.username,
        rol: data.rol
      })
    });

    console.log(data);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const data_res = await response.json();
    const lista = data_res.stockPorBodega;

    const contenedor = document.getElementById("productos-bodega");
    contenedor.innerHTML = ""; // Limpia contenido previo

    lista.forEach(item => {
      const article = document.createElement("article");
      article.classList.add("card");

      article.innerHTML = `
        <h3>${item.bodega}</h3>
        <p class="count">${item.total_stock} productos</p>
        <h5 class="ciudad">${item.ciudad}</h5>
        <button class="btn-ver-productos" data-id="${item.id}">Ver productos</button>
      `;

      contenedor.appendChild(article);
    });

    // 👉 Aquí viene la parte corregida
    document.querySelectorAll(".btn-ver-productos").forEach(btn => {
      btn.addEventListener("click", () => {

        // 1. Quitar "activo" de TODAS las cards
        document.querySelectorAll(".card")
          .forEach(card => card.classList.remove("activo"));

        // 2. Obtener la CARD padre del botón clickeado
        const card = btn.closest(".card");

        // 3. Activar SOLO esa card
        card.classList.add("activo");

        // 4. Cargar los productos de esa bodega
        const idBodega = btn.getAttribute("data-id");
        cargarProductosDeBodega(idBodega, token);
      });
    });

  } catch (error) {
    console.error("No se pudo cargar la información:", error);
  }
}


async function cargarProductosDeBodega(bodegaId, token) {
  try {
    const response = await fetch(`/api/bodega/${bodegaId}/productos`, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usuario: data.nombre,
        rol: data.rol
      })
    });

    if (!response.ok) {
      throw new Error("Error al obtener productos de la bodega");
    }

    const data_res = await response.json();
    const tbody = document.getElementById("tbody-productos-bodega");

    tbody.innerHTML = "";

    data_res.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.nombre}</td>
        <td>${item.stock}</td>
      `;
      tbody.appendChild(tr);
    });

  } catch (error) {
    console.error("Error:", error);
  }
}
async function cargarTodosLosProductos(token) {
  try {
    const response = await fetch("/api/productos-todos", {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    if (!response.ok) {
      throw new Error("Error al consultar productos");
    }

    let productos = await response.json();

    // ordenar por id
    productos = productos.sort((a, b) => a.id - b.id);

    // guardarlos globalmente
    listaProductos = productos;

    // pintar la tabla completa
    pintarTablaProductos(listaProductos);

  } catch (error) {
    console.error("Error:", error);
    alert("No fue posible cargar los productos.");
  }
}

function pintarTablaProductos(productos) {
  const cuerpoTabla = document.getElementById("lista-productos");

  // Limpiar tabla
  cuerpoTabla.innerHTML = "";

  // Llenar tabla
  productos.forEach(prod => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
                <td>${prod.id}</td>
                <td>${prod.nombre}</td>
                <td>${prod.categoria}</td>
                <td>${prod.stock_total}</td>
            `;

    cuerpoTabla.appendChild(fila);
  });
}


function filtrarProductos() {
  
  const filtroNombre = document.getElementById("filtro-nombre").value.toLowerCase().trim();
  
  let productosFiltrados = listaProductos;

  // filtro por nombre
  if (filtroNombre !== "") {
    productosFiltrados = productosFiltrados.filter(p =>
      p.nombre.toLowerCase().includes(filtroNombre)
    );
  }

  // vuelves a pintar la tabla
  pintarTablaProductos(productosFiltrados);
}


async function cargarProductos(token) {
  cargarTodosLosProductos(token);
}

async function cargarEntradas(token) {
  alert("cargarEntradas");
}

async function cargarSalidas(token) {
  alert("cargarSalidas");
}

async function cargarTransferencias(token) {
  alert("cargarTransferencias");
}
async function cargarUsuarios(token) {
  alert("cargarUsuarios");
}

// Navegación y ejecución según sección
function iniciarNavegacion() {
  const links = document.querySelectorAll('#sidebar nav a');
  const secciones = document.querySelectorAll('main > section');

  // Mostrar solo bodegas al inicio
  secciones.forEach(sec => sec.classList.add("oculto"));
  document.getElementById("sec-bodegas").classList.remove("oculto");

  links.forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();

      const destino = link.getAttribute("href");
      const seccion = document.getElementById(destino);

      if (!seccion) return;

      // Ocultar todas las secciones
      secciones.forEach(sec => sec.classList.add("oculto"));

      // Mostrar la sección seleccionada
      seccion.classList.remove("oculto");

      // Actualizar menú activo
      links.forEach(l => l.parentElement.classList.remove("activo_menu"));
      link.parentElement.classList.add("activo_menu");

      // Ejecutar la función correspondiente
      const token = sessionStorage.getItem("token");

      // Ejecutar función asociada a la sección
      const accion = acciones[destino];
      if (accion) {
        await accion(token);
      }


    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return window.location.href = "/login";
  }

  document.getElementById("btn-cerrar-sesion").addEventListener("click", () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  })

  try {
    const res = await fetch("/api/dashboard-data", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) throw new Error("No autorizado");

    data = await res.json();
    console.log(data);

    document.getElementById("username").innerText = data.nombre;
    document.getElementById("rol").innerText = data.rol;

  } catch (e) {
    console.log(e);
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  }
  iniciarNavegacion();
  await cargarProductosPorBodega(token);
  // Mostrar elementos del menú solo para admin
  if (data.rol === "ADMIN") {
    document.querySelectorAll("li.oculto").forEach(li => {
      li.classList.remove("oculto");
    });
  }

});
document.getElementById("btn-filtrar").addEventListener("click", filtrarProductos);
document.getElementById("filtro-nombre").addEventListener("keyup", filtrarProductos);



document.getElementById("btn-nuevo-producto").addEventListener("click", () => {
  document.getElementById("modal-nuevo-producto").classList.remove("oculto");
});

document.getElementById("btn-cerrar-modal").addEventListener("click", () => {
  document.getElementById("modal-nuevo-producto").classList.add("oculto");
});


document.getElementById("btn-guardar-producto").addEventListener("click", guardarNuevoProducto);

async function guardarNuevoProducto() {
  const nombre = document.getElementById("nuevo-nombre").value.trim();
  const categoria = document.getElementById("nuevo-categoria").value;
  const precio = document.getElementById("nuevo-precio").value;

  if (!nombre || !categoria || !precio) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const nuevo = {
    nombre,
    categoria,
    precio
  };

  console.log("Producto listo para enviar al backend:", nuevo);
}
