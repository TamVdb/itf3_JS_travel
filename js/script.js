//HTML element for cards
const DIV_CARDS = document.getElementById('cards');
const MODAL = document.getElementById('modal');
const CLOSE_BTN = document.getElementById('close');

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

   DIV_CARD.addEventListener('click', async () => {
      const CITY = city.name;
      const TEMP_MIN = document.getElementById('tempMin');
      const TEMP_MAX = document.getElementById('tempMax');
      const TEMP_FEELS = document.getElementById('tempFeel');
      const TEMP_REAL = document.getElementById('tempReal');
      const DESCRIPTION = document.getElementById('description');
      const ICON = document.getElementById('icon');
      const HUMIDITY = document.getElementById('humidity');
      const PRESSURE = document.getElementById('pressure');
      const WIND = document.getElementById('wind');
      const SUNRISE = document.getElementById('sunrise');
      const SUNSET = document.getElementById('sunset');
      console.log(CITY);

      MODAL.classList.remove('hidden');

      try {
         const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&APPID=79cee8d6443bb15189cc154089df595b&units=metric&lang=fr`
         );

         console.log(res.data);
         let tempMin = `Température minimale : ${res.data.main.temp_min} °C`;
         let tempMax = `Température maximale : ${res.data.main.temp_max} °C`;
         let tempFeels = `Température ressentie : ${res.data.main.feels_like} °C`;
         let tempReal = `Température réelle : ${res.data.main.temp} °C`;
         let description = `Description : ${res.data.weather[0].description}`;
         let icon = res.data.weather[0].icon;
         let iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

         // console.log(icon);
         // console.log(iconUrl);

         let humidity = `Taux d'humidité : ${res.data.main.humidity} %`;
         let pressure = `Pression : ${res.data.main.pressure} hPa`;
         let wind = `Vitesse du vent : ${res.data.wind.speed} m/s`;
         let timezone = res.data.timezone;
         let sunrise = `Le levé du soleil : ${new Date(
            (res.data.sys.sunrise + timezone) * 1000 - 7200000
         ).toLocaleTimeString()}`;
         let sunset = `Le couché du soleil : ${new Date(
            (res.data.sys.sunset + timezone) * 1000 - 7200000
         ).toLocaleTimeString()}`;

         TEMP_MIN.textContent = tempMin;
         TEMP_MAX.textContent = tempMax;
         TEMP_FEELS.textContent = tempFeels;
         TEMP_REAL.textContent = tempReal;
         DESCRIPTION.textContent = description;
         ICON.src = iconUrl;
         HUMIDITY.textContent = humidity;
         PRESSURE.textContent = pressure;
         WIND.textContent = wind;
         SUNRISE.textContent = sunrise;
         SUNSET.textContent = sunset;

         console.log(tempMin);
         console.log(tempMax);
         console.log(tempFeels);
         console.log(tempReal);
         console.log(description);
         console.log(humidity);
         console.log(pressure);
         console.log(wind);
         console.log(sunrise);
         console.log(sunset);
      } catch (err) {
         console.log(err);
      }
   });

   CLOSE_BTN.addEventListener('click', () => {
      MODAL.classList.add('hidden');
   });

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

/**
 * Copyrights - Retur current year
 */
function yearCopyrights() {
   const TODAY = new Date();
   return TODAY.getFullYear();
}
const COPYRIGHTS = document.getElementById('year');
COPYRIGHTS.innerText = yearCopyrights();
