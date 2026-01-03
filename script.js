let skins = [];
let history = {};
let selectedSkin = null;

// mock API
const API_URL = "https://mocki.io/v1/0d1b0f7f-5e3f-4f8a-9c0c-3b0f0a9a5f6a";

// загрузка данных
async function loadMarket() {
  const res = await fetch(API_URL);
  skins = await res.json();

  skins.forEach(s => {
    s.oldPrice = s.price;
    history[s.name] = [s.price];
  });

  selectedSkin = skins[0].name;
  renderTable(skins);
  drawChart();
}

// таблица
function renderTable(data) {
  const tbody = document.querySelector("#skinsTable tbody");
  tbody.innerHTML = "";

  data.forEach(skin => {
    const diff = skin.price - skin.oldPrice;
    const diffClass = diff >= 0 ? "up" : "down";
    const diffText = diff > 0 ? `+${diff}` : diff < 0 ? diff : "0";

    tbody.innerHTML += `
      <tr onclick="selectSkin('${skin.name}')">
        <td>${skin.name}</td>
        <td>${skin.price}</td>
        <td class="${diffClass}">${diffText}</td>
      </tr>
    `;
  });
}

// обновление цен
function updatePrices() {
  skins.forEach(skin => {
    skin.oldPrice = skin.price;
    skin.price += Math.floor(Math.random() * 40 - 20);
    if (skin.price < 1) skin.price = 1;

    history[skin.name].push(skin.price);
    if (history[skin.name].length > 20)
      history[skin.name].shift();
  });

  renderTable(skins);
  drawChart();
}

// поиск
document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  renderTable(
    skins.filter(s => s.name.toLowerCase().includes(value))
  );
});

// сортировка
function sortByPrice(desc) {
  const sorted = [...skins].sort((a, b) =>
    desc ? b.price - a.price : a.price - b.price
  );
  renderTable(sorted);
}

// выбор скина
function selectSkin(name) {
  selectedSkin = name;
  drawChart();
}

// график (Canvas)
function drawChart() {
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const data = history[selectedSkin];
  if (!data) return;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const padding = 20;

  ctx.strokeStyle = "#22c55e";
  ctx.beginPath();

  data.forEach((value, i) => {
    const x = padding + i * ((canvas.width - padding * 2) / (data.length - 1));
    const y =
      canvas.height -
      padding -
      ((value - min) / (max - min || 1)) *
        (canvas.height - padding * 2);

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
}

// старт
loadMarket();
setInterval(updatePrices, 15000);
