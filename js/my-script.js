const translations = {
    en: { title: "Palette Generator", count: "Count:", hex: "GEN HEX", hsl: "GEN HSL", copied: "Saved!", theme: ["Light", "Dark"] },
    es: { title: "Genera tu Paleta de colores", count: "Cantidad:", hex: "GEN HEX", hsl: "GEN HSL", copied: "Copiado!", theme: ["Claro", "Oscuro"] }
};

let currentLang = 'en';

// Helper: Random Color Generators
const getHex = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
const getHsl = () => `hsl(${Math.floor(Math.random()*360)}, ${Math.floor(Math.random()*100)}%, ${Math.floor(Math.random()*60)}%)`;

function updateLanguage() {
    const t = translations[currentLang];
    document.getElementById('title').innerText = t.title;
    document.getElementById('label-count').innerText = t.count;
    document.getElementById('btn-hex').innerText = t.hex;
    document.getElementById('btn-hsl').innerText = t.hsl;
    updateThemeLabel();
}

function updateThemeLabel() {
    const isDark = document.getElementById('mode-toggle').checked;
    document.getElementById('theme-label').innerText = isDark ? translations[currentLang].theme[1] : translations[currentLang].theme[0];
}

function generatePalette(type) {
    const count = parseInt(document.getElementById('color-count').value);
    const grid = document.getElementById('palette-grid');
    grid.innerHTML = '';

    // Adjust grid columns for 8 colors (4x2)
    grid.style.gridTemplateColumns = (count === 8) ? "repeat(2, 1fr)" : "repeat(3, 1fr)";

    for (let i = 0; i < count; i++) {
        const color = (type === 'hex') ? getHex() : getHsl();
        const swatch = document.createElement('div');
        swatch.className = 'swatch';
        swatch.style.backgroundColor = color;
        swatch.innerHTML = `<span>${color}</span>`;
        
        swatch.onclick = () => {
            navigator.clipboard.writeText(color);
            const span = swatch.querySelector('span');
            span.innerText = translations[currentLang].copied;
            setTimeout(() => span.innerText = color, 800);
        };
        grid.appendChild(swatch);
    }
}

// Event Listeners
document.getElementById('lang-toggle').addEventListener('change', (e) => {
    currentLang = e.target.checked ? 'es' : 'en';
    updateLanguage();
});

document.getElementById('mode-toggle').addEventListener('change', (e) => {
    document.body.classList.toggle('light-mode', !e.target.checked);
    updateThemeLabel();
});

// Init
updateLanguage();
generatePalette('hex');
