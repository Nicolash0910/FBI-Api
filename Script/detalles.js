async function Detalle(uid) {
  const res = await fetch(`https://api.fbi.gov/wanted/v1/${uid}`);
  const data = await res.json();

  const imagen = data.images && data.images.length > 0
    ? data.images[0].original
    : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

  document.getElementById("root").innerHTML = `
    <div style="padding:20px">
      <button onclick="home()" style="margin-bottom:10px;">← Volver</button>
      <h2>${data.title || "Sin nombre"}</h2>
      <img src="${imagen}" height="150" alt="${data.title}">
      <p>${data.description || "Sin descripción disponible"}</p>
      <p><b>Recompensa:</b> ${data.reward_text || "Ninguna"}</p>
    </div>
  `;
}
