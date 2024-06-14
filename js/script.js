//HTML element for cards
const DIV_CARDS = document.getElementById('cards');

//Initialisation : Création des cards
createCards(DIV_CARDS, CITIES);

//DIV_CARDS.append(createCard(CITIES[0])); //Tester la création de la carte

/**
 * @typedef City
 * @property {string} name
 * @property {string} image
 * @property {string} country
 * @property {string} continent
 * @property {number} nbResidents
 */

/**
 * Fonction qui, à partir d'un tableau de villes (cities), va créer plusieurs cards et les ajouter dans un élément parent (refElement)
 * @param {City[]} cities
 * @param {HTMLElement} refElement
 */

function createCards(refElement, cities) {
   refElement.innerHTML = '';
   for (const city of cities) {
      refElement.append(createCard(city));
   }
}

/**
 * Fonction qui créé une card pour une ville donnée
 * @param {City} city
 * @returns {HTMLElement}
 */

function createCard(city) {
   //Card
   const DIV_CARD = document.createElement('div');
   DIV_CARD.classList.add('card');

   //DIV Image
   const DIV_IMG = document.createElement('div');
   DIV_IMG.classList.add('image');

   //Image
   const IMG = document.createElement('img');
   IMG.src = city.image;
   IMG.alt = `Photo de la ville de ${city.name}, ${city.country}`;

   //City
   const DIV_CITY = document.createElement('div');
   DIV_CITY.classList.add('city');
   DIV_CITY.textContent = city.name;

   //Country
   const DIV_COUNTRY = document.createElement('div');
   DIV_COUNTRY.classList.add('country');
   DIV_COUNTRY.textContent = city.country;

   //Continent
   const DIV_CONTINENT = document.createElement('div');
   DIV_CONTINENT.classList.add('continent');
   DIV_CONTINENT.textContent = city.continent;

   //People
   const DIV_PEOPLE = document.createElement('div');
   DIV_PEOPLE.classList.add('people');
   // DIV_PEOPLE.textContent = !city.nbResidents ? 'Données inconnues' : city.nbResidents + ' millions'; //Ternaire
   //number.toLocaleString() permet de formater commme on écrirait le nombre dans notre locale -> va donc rajouter des espaces par groupe de 3 (ex 25 567 485)
   DIV_PEOPLE.textContent = city.nbResidents ? city.nbResidents.toLocaleString() + ' habitants' : 'Donnée inconnue';

   //Add each div where they belong to (position)
   DIV_IMG.appendChild(IMG);
   DIV_CARD.append(DIV_IMG, DIV_CITY, DIV_COUNTRY, DIV_CONTINENT, DIV_PEOPLE);

   //Return card
   return DIV_CARD;
}

const SELECT_CARDS = document.getElementById('selectCards');

//Quand on change la valeur du select
SELECT_CARDS.addEventListener('change', () => {
   //On récupère le continent sélectionné
   const SELECTED_CONTINENT = SELECT_CARDS.value;

   //Vérifier si "Tous les continents" est sélectionné
   if (SELECTED_CONTINENT === '') {
      createCards(DIV_CARDS, CITIES); // On affiche toutes les villes
   } else {
      //On crée une liste des villes du continent sélectionné
      const CITIES_IN_CONTINENT = CITIES.filter((city) => city.continent === SELECTED_CONTINENT);
      //On affiches les cards
      createCards(DIV_CARDS, CITIES_IN_CONTINENT);
   }
});

// //HTML element for cards
// const DIV_CARDS = document.getElementById('cards');

// //Create each card div's
// for (const city of CITIES) {
//    //Card
//    const DIV_CARD = document.createElement('div');
//    DIV_CARD.classList.add('card');

//    //DIV Image
//    const DIV_IMG = document.createElement('div');
//    DIV_IMG.classList.add('image');

//    //Image
//    const IMG = document.createElement('img');
//    IMG.src = city.image;
//    IMG.alt = `Photo de la ville de ${city.name}, ${city.country}`;

//    //City
//    const DIV_CITY = document.createElement('div');
//    DIV_CITY.classList.add('city');
//    DIV_CITY.textContent = city.name;

//    //Country
//    const DIV_COUNTRY = document.createElement('div');
//    DIV_COUNTRY.classList.add('country');
//    DIV_COUNTRY.textContent = city.country;

//    //Add each div where they belong to (position)
//    DIV_CARDS.append(DIV_CARD);
//    DIV_IMG.append(IMG);
//    DIV_CARD.append(DIV_IMG, DIV_CITY, DIV_COUNTRY);

//    /* -----------------------------------------------------------
//       * Create div's for MODALS and show HTML elements on CLICK
//    --------------------------------------------------------------*/
//    //HTML element for modals
//    const MODAL = document.getElementById('modal');
//    const OVERLAY = document.getElementById('background');

//    //Create each modal div's on click event
//    DIV_CARD.addEventListener('click', () => {
//       MODAL.innerHTML = '';

//       //Show a background overlay under open modal
//       MODAL.classList.remove('hidden');

//       //Container
//       const DIV_MODAL_CONTAINER = document.createElement('div');
//       DIV_MODAL_CONTAINER.classList.add('modal-container');

//       //DIV Image
//       const DIV_IMG = document.createElement('div');
//       DIV_IMG.classList.add('image');

//       //Image
//       const IMG = document.createElement('img');
//       IMG.src = city.image;
//       IMG.alt = city.name;

//       //infos
//       const DIV_INFOS = document.createElement('div');
//       DIV_INFOS.classList.add('infos');

//       //City
//       const DIV_CITY = document.createElement('div');
//       DIV_CITY.classList.add('city');
//       DIV_CITY.textContent = city.name;

//       //Country
//       const DIV_COUNTRY = document.createElement('div');
//       DIV_COUNTRY.classList.add('country');
//       DIV_COUNTRY.textContent = city.country;

//       //Continent
//       const DIV_CONTINENT = document.createElement('div');
//       DIV_CONTINENT.classList.add('continent');
//       DIV_CONTINENT.textContent = city.continent;

//       //People
//       const DIV_PEOPLE = document.createElement('div');
//       DIV_PEOPLE.classList.add('people');
//       DIV_PEOPLE.textContent = !city.nbResidents ? 'Données inconnues' : city.nbResidents + ' millions'; //Ternaire

//       DIV_IMG.append(IMG);
//       DIV_INFOS.append(DIV_CITY, DIV_COUNTRY, DIV_CONTINENT, DIV_PEOPLE);
//       DIV_MODAL_CONTAINER.append(DIV_IMG, DIV_INFOS);
//       MODAL.append(DIV_MODAL_CONTAINER);
//    });
// }

/**
 * Copyrights - Retur current year
 */
function yearCopyrights() {
   const TODAY = new Date();
   return TODAY.getFullYear();
}
const COPYRIGHTS = document.getElementById('year');
COPYRIGHTS.innerText = yearCopyrights();
