const locTimeZone = document.querySelector('.timezone');
let icon = document.querySelector('.icon');
const degSection = document.querySelector('.degree-section');
const deg = document.querySelector('.degree-section h2');
const symbol = document.querySelector('.degree-section span');
const tempDescription = document.querySelector('.temperature-description');
window.alert("Unfortunately, due to some problems, only the Air-condition in Tehran can be reported");
const getLoc = async () => {

    // const url = 'http://ip-api.com/json/?fields=status,country,city,lat,lon,timezone';

    // const response = await fetch(url);
    // const data = response.json();
  const data = {"status":"success","country":"Iran","city":"Tehran","lat":35.7108,"lon":51.4274,"timezone":"Asia/Tehran"};
    return data;
}
// const loc = {"status":"success","country":"Iran","city":"Tehran","lat":35.7108,"lon":51.4274,"timezone":"Asia/Tehran"}
// const lat = 35.7108;
// const lon = 51.4274;
// const timezone = "Asia/Tehran";
// const country="Iran";

const getWeather = async (lat, lon) => {
    apiKey = 'f0894defae7c5584798f8812232a40c2';

    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const response = await fetch(url);
    const data = response.json();

    return data;
}

function getIcon(weatherMain){
    let icon;
    switch (weatherMain) {
        case 'Thunderstorm':
            icon = `${weatherMain}.svg`;
            break;
        case 'Drizzle':
            icon = `${weatherMain}.svg`;
            break;
        case 'Rain':
            icon = `${weatherMain}.svg`;
            break;
        case 'Snow':
            icon = `${weatherMain}.svg`;
            break;
        case 'Clear':
            const DayOrNigh = getDayOrNight();
            icon = `${weatherMain}-${DayOrNigh}.svg`;
            break;
        case 'Clouds':
            icon = `${weatherMain}.svg`;
            break;
        case 'Atmosphere':
            icon = `${weatherMain}.png`;
            break;
    }
    return icon;
}

function getDayOrNight() {
    let DayOrNigh;
    var day = new Date();

    const hour = day.getHours();

    if (hour >= 6 && hour <= 19) {
        DayOrNigh = 'Day';
    } else {
        DayOrNigh = 'Night';
    }

    return DayOrNigh;
}

function getTemp(weatherTemp){
    const k = weatherTemp;
    const f = (k - 273.15) * 9/5 + 32;
    const c = k - 273.15;
    return temp = {kel:Math.floor(k), far:Math.floor(f), can:Math.floor(c)};
}



window.addEventListener('load', function(){
    getLoc()
        .then(locData => {
            const timeZone = locData.timezone;
            locTimeZone.textContent = timeZone;
            getWeather(locData.lat, locData.lon)
                .then(weData => {
                    const weatherTemp = weData.main.temp;
                    const weatherMain = weData.weather[0].main;
                    const weatherDes = weData.weather[0].description;

                    const iconName = getIcon(weatherMain);
                    icon.innerHTML = `<img src='icons/${iconName}'></img>`;

                    deg.textContent = Math.floor(weatherTemp);
                    symbol.textContent = 'K';
                    degSection.addEventListener('click', function(e){
                        if(symbol.textContent == 'K'){
                            deg.textContent = getTemp(weatherTemp).far;
                            symbol.textContent = 'F';
                        } 
                        else if(symbol.textContent == 'F'){
                            deg.textContent = getTemp(weatherTemp).can;
                            symbol.textContent = 'C';
                        }
                        else{
                            deg.textContent = getTemp(weatherTemp).kel;
                            symbol.textContent = 'K';
                        }
                    })
                    tempDescription.textContent = weatherDes;
                    console.log(weatherTemp, weatherMain, weatherDes);
                })
        })
})
