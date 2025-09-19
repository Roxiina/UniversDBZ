// Menu burger mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  nav.classList.toggle('nav-active');
});

// Carrousel interactif
const characters = [
  {
    name: "Goku",
    img: "images/goku.png",
    power: "9000+",
    history: "Saiyan envoyé sur Terre, défenseur de l'univers.",
    summary: "Toujours prêt à se battre pour protéger ses amis et sa planète.",
    transformationsList: [
      { name: "Super Saiyan", img: "images/goku-super.jpg" },
      { name: "Super Saiyan God", img: "images/goku-god.jpg" },
      { name: "Ultra Instinct", img: "images/goku-ultra.jpg" }
    ],
    relations: "Yamcha (ami), Piccolo (allié), Vegeta (rival)",
    couple: "Chichi"
  },
  {
    name: "Vegeta",
    img: "images/vegeta.png",
    power: "8500+",
    history: "Prince des Saiyans, rival éternel de Goku.",
    summary: "Très fier, il cherche constamment à dépasser Goku.",
    transformationsList: [
      { name: "Super Saiyan", img: "images/vegeta-super.jpg" },
      { name: "Super Saiyan Blue", img: "images/vegeta-blue.jpg" },
      { name: "Ultra Ego", img: "images/vegeta-ultra.jpg" }
    ],
    relations: "Goku (rival)",
    couple: "Bulma"
  },
  {
    name: "Krillin",
    img: "images/krillin.png",
    power: "2000",
    history: "Meilleur ami de Goku, courageux malgré sa taille.",
    summary: "Maître d'arts martiaux et toujours fidèle à ses amis.",
    transformationsList: [{ name: "Aucune", img: "images/krillin.png" }],
    relations: "Goku (ami)",
    couple: "C-18"
  }
];

let currentIndex = 0;

// Sélection éléments DOM
const charImg = document.getElementById('char-img');
const charName = document.getElementById('char-name');
const charPower = document.getElementById('char-power');
const charHistory = document.getElementById('char-history');
const charSummary = document.getElementById('char-summary');
const charTransformations = document.getElementById('char-transformations');
const charRelations = document.getElementById('char-relations');
const charCouple = document.getElementById('char-couple');
const powerBar = document.getElementById('power-bar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const maxPower = 10000;

function updateCharacter() {
  const char = characters[currentIndex];
  charImg.src = char.img;
  charImg.style.opacity = 1;
  charName.textContent = char.name;
  charHistory.innerHTML = `<strong>Histoire:</strong> ${char.history}`;
  charSummary.innerHTML = `<strong>Résumé:</strong> ${char.summary}`;
  charRelations.textContent = `Relations: ${char.relations}`;
  charCouple.textContent = `Couple: ${char.couple}`;

  const numericPower = parseInt(char.power.replace('+','')) || 0;
  const powerPercent = Math.min((numericPower / maxPower) * 100, 100);
  powerBar.style.width = powerPercent + '%';
  powerBar.textContent = char.power;

  charTransformations.innerHTML = '<strong>Transformations:</strong> ' + 
    char.transformationsList.map(t => 
      `<span class="transformation" data-img="${t.img}">${t.name}</span>`
    ).join(', ');

  const transElements = document.querySelectorAll('.transformation');
  transElements.forEach(el => {
    let hoverTimeout;
    el.addEventListener('mouseover', () => {
      hoverTimeout = setTimeout(() => {
        charImg.style.opacity = 0;
        setTimeout(() => {
          charImg.src = el.dataset.img;
          charImg.style.opacity = 1;
        }, 200);
      }, 200);
    });
    el.addEventListener('mouseout', () => {
      clearTimeout(hoverTimeout);
      charImg.style.opacity = 0;
      setTimeout(() => {
        charImg.src = char.img;
        charImg.style.opacity = 1;
      }, 200);
    });
  });
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + characters.length) % characters.length;
  updateCharacter();
});
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % characters.length;
  updateCharacter();
});

// Initialisation
updateCharacter();
