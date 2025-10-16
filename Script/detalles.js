// === detalle.js ===

async function Detalle(id) {
  const res = await fetch(`https://api.fbi.gov/wanted/v1/item/${id}`);
  const data = await res.json();

  let nombre;
  if (data.title) {
    nombre = data.title;
  } else {
    nombre = "Sin nombre";
  }

  let descripcion;
  if (data.description) {
    descripcion = data.description;
  } else {
    descripcion = "No hay descripción disponible.";
  }

  let imagen;
  if (data.images && data.images.length > 0) {
    imagen = data.images[0].original;
  } else {
    imagen = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  }

  let recompensa;
  if (data.reward_text) {
    recompensa = data.reward_text;
  } else {
    recompensa = "No se ofrece recompensa.";
  }

  document.getElementById("root").innerHTML = `
    <div style="padding: 10px;">
      <button onclick="home()" style="background:#7c3aed; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">⬅ Volver</button>
      <h2>${nombre}</h2>
      <img src="${imagen}" width="250">
      <p>${descripcion}</p>
      <p><strong>Recompensa:</strong> ${recompensa}</p>
    </div>
  `;
}
