const api = { //api para extrar datos del clima
	key: '83958f1d11a476932a203bc7d9e5c6fb',
	url: `https://api.openweathermap.org/data/2.5/weather`
}

/*const api = {
  key: '9e122cd782b2d0333f5fe4e7fa192062',
  url: `https://api.openweathermap.org/data/2.5/weather`
}*/
const card = document.getElementById('card')
const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('temp-img');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

function updateImages(data) {
  const temp = toCelsius(data.main.temp);
  let src = 'img/termometro.png';
  if (temp > 20) {
    src = 'img/soleado.png';
  } else if (temp < 20) {
    src = 'img/nublado.png';
  }
  tempImg.src = src;
}

async function search(query) { //funcion asincrona, nos permite obtener la info de la API
  try {
    const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
    const data = await response.json();
    card.style.display = 'block';
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    date.innerHTML = (new Date()).toLocaleDateString();
    temp.innerHTML = `${toCelsius(data.main.temp)}º`;
    weather.innerHTML = data.weather[0].description;
    range.innerHTML = `${toCelsius(data.main.temp_min)}º / ${toCelsius(data.main.temp_max)}º`;
    updateImages(data);
  } catch (err) {
    console.log(err);
    alert('Hubo un error');
  }
}

function toCelsius(kelvin) { //transforma a unidad celsius
  return Math.round(kelvin - 273.15);
}

function onSubmit(event) {
	event.preventDefault(); //para que no reactualice la pagina al darle submit
	search(input.value); //pone el alerta
}

const form = document.getElementById('search-from'); //llamo al ID del from
const input = document.getElementById('id-search'); //llamo al ID de input para mostrar info

form.addEventListener('submit', onSubmit, true); //llama a la funcion onSubmit

//-------------------- SOBRE MI --------------------//
const open = document.getElementById('open');
const modal_sobremi = document.getElementById('modal_sobremi');
const close = document.getElementById('close');

open.addEventListener('click', () => {
  modal_sobremi.classList.add('show');  
});

close.addEventListener('click', () => {
  modal_sobremi.classList.remove('show');
});

