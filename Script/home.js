function FiltroConexion(filtro) {
  let filtrados = [];

  if (filtro === "All") {
    filtrados = personas;
  } else {
    filtrados = personas.filter(p => {
      const sexo = (p.sex || "").toLowerCase();
      return sexo === filtro.toLowerCase();
    });
  }

  document.getElementById("la-lista").innerHTML = generarLista(filtrados);
}



function generarLista(array) {
  let listaHTML = "";
  for (let i = 0; i < array.length; i++) {
    const persona = array[i];
    const id = persona.uid;
    const nombre = persona.title || "Sin nombre";
    const imagen = persona.images && persona.images.length > 0
      ? persona.images[0].original
      : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

    listaHTML += `
      <div class="c-lista-persona persona-${id}" onclick="Detalle('${id}')">
        <h3>${nombre}</h3>
        <img src="${imagen}" height="100" loading="lazy" alt="${nombre}">
        <p>${persona.description || "Sin descripción"}</p>
      </div>`;
  }
  return listaHTML;
}

function buscadorfuncion(texto) {
  const valor = texto.toLowerCase();
  const filtrados = valor.length >= 3
    ? personas.filter(p =>
        (p.title || "").toLowerCase().includes(valor) ||
        (p.description || "").toLowerCase().includes(valor)
      )
    : personas;

  document.getElementById("la-lista").innerHTML = generarLista(filtrados);
}

function home() {
  document.getElementById("root").innerHTML = "";

  // Input de búsqueda
  const buscador = document.createElement("input");
  buscador.classList.add("c-buscador");
  buscador.type = "text";
  buscador.placeholder = "Buscar persona buscada...";
  buscador.addEventListener("input", () => buscadorfuncion(buscador.value));

  // Filtros simples (All, Male, Female)
  const filtros = ["All", "Male", "Female"];
  const contenedorFiltros = document.createElement("div");
  contenedorFiltros.classList.add("filtros-container");

  for (let i = 0; i < filtros.length; i++) {
    const btn = document.createElement("button");
    btn.textContent = filtros[i];
    btn.addEventListener("click", () => FiltroConexion(filtros[i]));
    contenedorFiltros.appendChild(btn);
  }

  // Contenedor de lista
  const contenedorLista = document.createElement("div");
  contenedorLista.id = "la-lista";
  contenedorLista.innerHTML = generarLista(personas);

  // Insertar todo
  const root = document.getElementById("root");
  root.appendChild(buscador);
  root.appendChild(contenedorFiltros);
  root.appendChild(contenedorLista);
}
