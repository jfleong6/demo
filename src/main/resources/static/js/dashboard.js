async function cargarProductosPorBodega(token) {
  try {
    const response = await fetch("/api/dashboard-info-bodega", {
      headers: {
        "Authorization": "Bearer " + token
      }
    }
    );

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const data = await response.json();
    const lista = data.stockPorBodega;

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
    document.querySelectorAll(".btn-ver-productos").forEach(btn => {
      btn.addEventListener("click", () => {
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
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    if (!response.ok) {
      throw new Error("Error al obtener productos de la bodega");
    }

    const data = await response.json();
    const tbody = document.getElementById("tbody-productos-bodega");

    tbody.innerHTML = "";

    data.forEach(item => {
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
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    if (!res.ok) throw new Error("No autorizado");

    const data = await res.json();
    console.log(data);

    document.getElementById("username").innerText = data.nombre;
    document.getElementById("rol").innerText = data.rol;

  } catch (e) {
    console.log(e);
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  }
  await cargarProductosPorBodega(token);

});
