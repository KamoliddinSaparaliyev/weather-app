let container = document.querySelector('#container');
let forecastDays = document.querySelector('.day-info');
let elForm = document.querySelector('#form');
document.body.onload = () => {
    fetch('https://api.weatherapi.com/v1/forecast.json?key=46f3466f86294fde9fa105548232501&q=tashkent&aqi=yes&days=5&is_day=yes')
        .then(response => response.json())
        .then(data => renderWeather(data));
}

elForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let text = e.target[0].value.trim();
    if (text) {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=46f3466f86294fde9fa105548232501&q=${e.target[0].value.trim()}&aqi=yes&days=5&is_day=yes`)
            .then(response => response.json())
            .then(data => renderWeather(data))
            .catch(error =>console.error(error.message))
        e.target.reset()
    } else {
        alert('Enter location');
    }
})

function renderWeather(data) {
    console.log(data);
    if (data.forecast.forecastday.length>0) {
        container.innerHTML = "";
        let now = new Date(data.location.localtime)
        let day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
        let month = now.toLocaleString('en-US', { month: 'short' })
        let week_title = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let week = now.getDay()
        let weekDay = week_title[week]
        let year = now.getFullYear()
        let { name, country } = data.location
        let { temp_c, humidity, wind_kph, precip_in } = data.current
        let { text, icon } = data.current.condition

        let now1 = new Date(data.forecast.forecastday[1].date)
        let now2 = new Date(data.forecast.forecastday[2].date)
        let now3 = new Date(data.forecast.forecastday[3].date)
        let now4 = new Date(data.forecast.forecastday[4].date)

        container.innerHTML = `
    <div class="wrapper">
            <div class="info-box">
                <div class="box-1">
                    <h4> ${weekDay}</h4>
                    <p class="date">${day} ${month} ${year}</p>
                    <div class="location">
                        <img src="./assets/image/location.svg" alt="">
                        <p>${name}, ${country}</p>
                    </div>
                </div>
                <div class="box-2">
                    <img height="105" src="https:${icon}" alt="${text} image">
                    <h3>${temp_c}°C</h3>
                    <h5>${text}</h5>
                </div>
            </div>
            <div class="wrapper-info">
                <div class="inner-box">
                    <div class="inner-item">
                        <h5>PRECIPITATION</h5> <span>${precip_in}%</span>
                    </div>
                    <div class="inner-item">
                        <h5>HUMIDITY</h5> <span>${humidity}%</span>
                    </div>
                    <div class="inner-item">
                        <h5>WIND</h5> <span>${wind_kph}km/h</span></li>
                    </div>
                    <div class="day-info">
                        <div class="weather-day">
                            <img height="54" src="https:${data.forecast.forecastday[1].day.condition.icon}" alt="${data.forecast.forecastday[1].day.condition.text} image">
                            <p>${now1.toLocaleString('en-US', { weekday: 'short' })}</p>
                            <h6>${data.forecast.forecastday[1].day.maxtemp_c}°C</h6>
                        </div>
                        <div class="weather-day">
                            <img height="54" src="https:${data.forecast.forecastday[2].day.condition.icon}" alt="${data.forecast.forecastday[2].day.condition.text} image">
                            <p>${now2.toLocaleString('en-US', { weekday: 'short' })}</p>
                            <h6>${data.forecast.forecastday[2].day.maxtemp_c}°C</h6>
                        </div>
                        <div class="weather-day">
                            <img height="54" src="https:${data.forecast.forecastday[3].day.condition.icon}" alt="${data.forecast.forecastday[3].day.condition.text} image">
                            <p>${now3.toLocaleString('en-US', { weekday: 'short' })}</p>
                            <h6>${data.forecast.forecastday[3].day.maxtemp_c}°C</h6>
                        </div>
                        <div class="weather-day">
                            <img height="54" src="https:${data.forecast.forecastday[4].day.condition.icon}" alt="${data.forecast.forecastday[4].day.condition.text} image">
                            <p>${now4.toLocaleString('en-US', { weekday: 'short' })}</p>
                            <h6>${data.forecast.forecastday[4].day.maxtemp_c}°C</h6>
                        </div>
                    </div>
                    
                </div>
    `} else {
        alert(data.error.message)
    }
}
