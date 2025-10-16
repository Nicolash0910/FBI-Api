// === conexion.js ===

async function conexionLista() {
  const res = await fetch("https://api.fbi.gov/wanted/v1/list");
  const data = await res.json();
  return data.items; // la API devuelve los resultados en .items
}

let personas = [];

async function General() {
  if (personas.length === 0) {
    personas = await conexionLista();
  }
  home();
}

General();
