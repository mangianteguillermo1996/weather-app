const URL_BASE = `https://api.openweathermap.org/data/2.5/weather`;

const API_KEY = 'c6e76ccd54863a4549bf511aa401c420';

const diffKelvin = 273.15;

let parametros = '?q=${city name}&appid=${API key}'


document.getElementById('searchButton').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value
    
    if (!city) {
        alert('Ingrese ciudad válida');
        return;
    }

    const data = await fetchWheather(city); 
    if (data) showWheatherData(data); 
})


async function fetchWheather(city){

    try{
        const res = await fetch(`${URL_BASE}?q=${city}&appid=${API_KEY}&lang=es`)
        const data = await res.json()

        if (!res.ok) throw new Error('Error al consultar el clima');
    
        return data

    } catch(error){
        alert(error.message)
    } 
}

function showWheatherData (data) {
    const divResponseDate = document.getElementById('responseData')
    divResponseDate.innerHTML = ''

    const cityName = data.name
    const countryName = data.sys.country
    const temp = data.main.temp
    const humidity = data.main.humidity
    const description = data.weather[0].description
    const icon = data.weather[0].icon

    const cityInfo = document.createElement('h2')
    cityInfo.textContent = `${cityName}, ${countryName}`


    const tempInfo = document.createElement('p')
    tempInfo.textContent = `La temperatura es ${Math.floor(temp-diffKelvin)}°C`

    const humidityInfo = document.createElement('p')
    humidityInfo.textContent = `La humedad es del ${humidity}%`

    const iconInfo = document.createElement('img')
    iconInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

    const descriptionInfo = document.createElement('p')
    descriptionInfo.textContent = `La descripción meterológica es ${description}`

    divResponseDate.appendChild(cityInfo)
    divResponseDate.appendChild(tempInfo)
    divResponseDate.appendChild(humidityInfo)
    divResponseDate.appendChild(iconInfo)
    divResponseDate.appendChild(descriptionInfo)
}