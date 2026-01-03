// Пример данных — заменяй на реальные скины позже
const marketData = [
    {name: "AKR Dragon", price: 2500, img: "https://via.placeholder.com/200x150?text=AKR+Dragon"},
    {name: "AWM Sport", price: 1950, img: "https://via.placeholder.com/200x150?text=AWM+Sport"},
    {name: "M4 Fire", price: 1800, img: "https://via.placeholder.com/200x150?text=M4+Fire"},
    {name: "Desert Eagle Red", price: 1200, img: "https://via.placeholder.com/200x150?text=Deagle+Red"},
    {name: "Glock Blue", price: 900, img: "https://via.placeholder.com/200x150?text=Glock+Blue"}
];

const grid = document.getElementById('marketGrid');
const searchInput = document.getElementById('search');

function displaySkins(skins) {
    grid.innerHTML = '';
    skins.forEach(skin => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${skin.img}" alt="${skin.name}">
            <div class="card-content">
                <h3>${skin.name}</h3>
                <p>${skin.price} gold</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Поиск
searchInput.addEventListener('input', () => {
    const filtered = marketData.filter(skin => 
        skin.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    displaySkins(filtered);
});

// Показать все скины при загрузке
displaySkins(marketData);
