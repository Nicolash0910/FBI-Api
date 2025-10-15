async function conexionLista(filtro) {
  let url = "https://api.fbi.gov/wanted/v1/list";

  // Filtro básico por sexo, si no es "All"
  if (filtro && filtro !== "All") {
    url += `?sex=${filtro}`;
  }

  const res = await fetch(url);
  const data = await res.json();
  return data.items; // devuelve la lista de personas
}

let personas = [];

async function General() {
  if (personas.length === 0) {
    personas = await conexionLista("All");
  }
  home();
}

General(); 
