async function busqueda() {
  const res = await fetch("https://api.fbi.gov/wanted/v1/list");
  const data = await res.json();

  const persona = data.items[0];
  let nombre;
  let descripcion;
  let imagen;
  let recompensa;

  if (persona.title) {
    nombre = persona.title;
  } else {
    nombre = "Nombre no disponible";
  }

  if (persona.description) {
    descripcion = persona.description;
  } else {
    descripcion = "Sin descripción disponible.";
  }

  if (persona.images && persona.images.length > 0) {
    imagen = persona.images[0].original;
  } else {
    imagen = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  }

  document.getElementById("root").innerHTML = `
    <h2>Persona más buscada por el FBI</h2>
    <h3>${nombre}</h3>
    <img src="${imagen}" width="200">
    <p>${descripcion}</p>
  `;
}
