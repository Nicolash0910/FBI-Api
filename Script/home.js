function FiltroConexion(filtro) {
  let filtrados = [];

  if (filtro === "All") {
    filtrados = personas;
  } else {
    filtrados = [];
    for (let i = 0; i < personas.length; i++) {
      const sexo = (personas[i].sex || "").toLowerCase();
      if (sexo === filtro.toLowerCase()) {
        filtrados.push(personas[i]);
      }
    }
  }

  document.getElementById("la-lista").innerHTML = generarLista(filtrados);
}

function generarLista(array) {
  let listaHTML = "";

  for (let i = 0; i < array.length; i++) {
    const persona = array[i];
    const id = persona.uid;

    let nombre;
    if (persona.title) {
      nombre = persona.title;
    } else {
      nombre = "Sin nombre";
    }

    let imagen;
    if (persona.images && persona.images.length > 0) {
      imagen = persona.images[0].original;
    } else {
      imagen = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
    }

    let descripcion;
    if (persona.description) {
      descripcion = persona.description;
    } else {
      descripcion = "Sin descripción";
    }

    listaHTML += `
      <div class="c-lista-persona persona-${id}" onclick="Detalle('${id}')">
        <h3>${nombre}</h3>
        <img src="${imagen}" height="100" loading="lazy" alt="${nombre}">
        <p>${descripcion}</p>
      </div>`;
  }

  return listaHTML;
}

function buscadorfuncion(texto) {
  const valor = texto.toLowerCase();
  let filtrados = [];

  if (valor.length >= 3) {
    for (let i = 0; i < personas.length; i++) {
      const titulo = (personas[i].title || "").toLowerCase();
      const descripcion = (personas[i].description || "").toLowerCase();

      if (titulo.includes(valor) || descripcion.includes(valor)) {
        filtrados.push(personas[i]);
      }
    }
  } else {
    filtrados = personas;
  }

  document.getElementById("la-lista").innerHTML = generarLista(filtrados);
}

function home() {
  document.getElementById("root").innerHTML = "";

  const buscador = document.createElement("input");
  buscador.classList.add("c-buscador");
  buscador.type = "text";
  buscador.placeholder = "Buscar persona buscada...";
  buscador.addEventListener("input", () => buscadorfuncion(buscador.value));

  
  const filtros = ["All", "Male", "Female"];
  const contenedorFiltros = document.createElement("div");
  contenedorFiltros.classList.add("filtros-container");

  for (let i = 0; i < filtros.length; i++) {
    const btn = document.createElement("button");
    btn.textContent = filtros[i];
    btn.addEventListener("click", () => FiltroConexion(filtros[i]));
    contenedorFiltros.appendChild(btn);
  }

  const contenedorLista = document.createElement("div");
  contenedorLista.id = "la-lista";
  contenedorLista.innerHTML = generarLista(personas);

  const root = document.getElementById("root");
  root.appendChild(buscador);
  root.appendChild(contenedorFiltros);
  root.appendChild(contenedorLista);
}
