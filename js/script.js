// Menu burger mobile
const burger = document.querySelector('.burger'); // Sélectionne l'élément du menu burger
const nav = document.querySelector('.nav-links'); // Sélectionne la liste de navigation

// Toggle menu burger au clic
burger.addEventListener('click', () => {
  nav.classList.toggle('nav-active'); // Ajoute ou retire la classe 'nav-active' pour afficher/masquer le menu
});

// Carrousel interactif avec transformations
const characters = [  // Tableau d'objets représentant les personnages
  {
    name: "Goku",
    img: "images/goku.png",
    power: "9000+",
    history: "Saiyan envoyé sur Terre, défenseur de l'univers.",
    summary: "Toujours prêt à se battre pour protéger ses amis et sa planète.",
    transformationsList: [  // Liste des transformations avec image correspondante
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
    relations: "Bulma (amie), Goku (rival)",
    couple: "Bulma"
  },
  {
    name: "Krillin",
    img: "images/krillin.png",
    power: "2000",
    history: "Meilleur ami de Goku, courageux malgré sa taille.",
    summary: "Maître d'arts martiaux et toujours fidèle à ses amis.",
    transformationsList: [
      { name: "Aucune", img: "images/krillin.png" } // Pas de transformation
    ],
    relations: "Goku (ami), Android 18 (allié)",
    couple: "Android 18"
  }
];

let currentIndex = 0; // Index du personnage actuellement affiché

// Sélection des éléments du DOM pour mettre à jour le carrousel
const charImg = document.getElementById('char-img');
const charName = document.getElementById('char-name');
const charPower = document.getElementById('char-power');
const charHistory = document.getElementById('char-history');
const charSummary = document.getElementById('char-summary');
const charTransformations = document.getElementById('char-transformations');
const charRelations = document.getElementById('char-relations');
const charCouple = document.getElementById('char-couple');
const powerBar = document.getElementById('power-bar');

const prevBtn = document.getElementById('prevBtn'); // Bouton précédent
const nextBtn = document.getElementById('nextBtn'); // Bouton suivant

const maxPower = 10000; // Puissance max pour calcul proportionnel de la barre

// Fonction pour mettre à jour l'affichage du personnage
function updateCharacter() {
  const char = characters[currentIndex]; // Personnage actuel
  charImg.src = char.img; // Image principale
  charImg.style.opacity = 1; // Animation d'apparition
  charName.textContent = char.name; // Nom
  charHistory.innerHTML = `<strong>Histoire:</strong> ${char.history}`; // Histoire
  charSummary.innerHTML = `<strong>Résumé:</strong> ${char.summary}`; // Résumé
  charRelations.textContent = `Relations: ${char.relations}`; // Relations
  charCouple.textContent = `Couple: ${char.couple}`; // Couple

  // Barre de puissance
  const numericPower = parseInt(char.power.replace('+','')) || 0; // Extraction du nombre
  const powerPercent = Math.min((numericPower / maxPower) * 100, 100); // Calcul proportionnel
  powerBar.style.width = powerPercent + '%'; // Largeur de la barre
  powerBar.textContent = char.power; // Affiche la puissance en texte

  // Transformations interactives
  charTransformations.innerHTML = '<strong>Transformations:</strong> ' + 
    char.transformationsList.map(t => 
      `<span class="transformation" data-img="${t.img}">${t.name}</span>` // Chaque transformation est hoverable
    ).join(', ');

  const transElements = document.querySelectorAll('.transformation'); // Sélection des spans de transformation
  transElements.forEach(el => {
    let hoverTimeout;

    el.addEventListener('mouseover', () => { // Au survol
      hoverTimeout = setTimeout(() => {
        charImg.style.opacity = 0; // Animation de disparition
        setTimeout(() => {
          charImg.src = el.dataset.img; // Change l'image pour la transformation
          charImg.style.opacity = 1; // Animation d'apparition
        }, 200);
      }, 200); // Petit délai pour moins de sensibilité
    });

    el.addEventListener('mouseout', () => { // Quand le curseur quitte
      clearTimeout(hoverTimeout); // Annule le timeout si l'utilisateur part vite
      charImg.style.opacity = 0; // Animation disparition
      setTimeout(() => {
        charImg.src = char.img; // Revenir à l'image de base
        charImg.style.opacity = 1;
      }, 200);
    });
  });
}

// Boutons précédent / suivant
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + characters.length) % characters.length; // Navigation circulaire
  updateCharacter();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % characters.length; // Navigation circulaire
  updateCharacter();
});

// Initialiser le carrousel au chargement
updateCharacter();
