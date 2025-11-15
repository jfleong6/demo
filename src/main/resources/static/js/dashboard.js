async function cargarProductosPorBodega(token) {
  try {
    const response = await fetch("/api/dashboard-info-bodega",{ 
      headers: {
      "Authorization": "Bearer " + token
    }}
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
                <h5 class ="ciudad">${item.ciudad}</h5>
            `;

      contenedor.appendChild(article);
    });

  } catch (error) {
    console.error("No se pudo cargar la información:", error);
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
