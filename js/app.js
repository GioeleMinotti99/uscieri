const PASSWORD = "CAMBIA_QUESTA_PASSWORD";
const TOKEN_KEY = "uscieri_auth";

const maps = {
  prova1: {
    name: "Prova 1",
    image: "maps/prova1.png",
    points: [
      {
        id: "P1",
        x: 92,
        y: 16,
        title: "P1 – Palco",
        text: `
          <ul>
            <li>Gestire eventuali emergenze</li>
            <li>Controllare gli accessi al palco</li>
          </ul>`
      },
      {
        id: "P2",
        x: 8,
        y: 44,
        title: "P2 – Area centrale",
        text: `
          <ul>
            <li>Eseguire il conteggio</li>
            <li>Monitorare situazioni pericolose</li>
          </ul>`
      },
      {
        id: "P3",
        x: 50,
        y: 88,
        title: "P3 – Ingresso",
        text: `
          <ul>
            <li>Gestione dell'arrivo dei fratelli</li>
            <li>Sorveglianza durante l'intervallo</li>
          </ul>`
      }
    ]
  }
};

function login() {
  const input = document.getElementById("password").value;
  if (input === PASSWORD) {
    localStorage.setItem(TOKEN_KEY, "ok");
    showApp();
  } else {
    document.getElementById("login-error").innerText = "Password errata";
  }
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
  location.reload();
}

function showApp() {
  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "block";
  loadMap("prova1");
}

function loadMap(key) {
  const map = maps[key];
  document.getElementById("map-title").innerText = map.name;
  document.getElementById("map-image").src = map.image;

  const layer = document.getElementById("points-layer");
  layer.innerHTML = "";

  map.points.forEach(p => {
    const el = document.createElement("div");
    el.className = "point";
    el.style.left = p.x + "%";
    el.style.top = p.y + "%";
    el.innerText = p.id;
    el.onclick = () => openPopup(p.title, p.text);
    layer.appendChild(el);
  });
}

function openPopup(title, text) {
  document.getElementById("popup-content").innerHTML = `<h3>${title}</h3>${text}`;
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

if (localStorage.getItem(TOKEN_KEY)) {
  showApp();
}
