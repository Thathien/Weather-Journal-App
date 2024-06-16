/* Personal API Key of OpenWeatherMap API  */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '4090163bb2f47208e1b89564a993750a';

let date = new Date();
let newDate = date.getMonth() + '.' + date.getDate() + '.' + date.getFullYear();

const formInput = document.getElementById('formInput');

// Event listener add function to existing HTML DOM
const generateBtn = document.getElementById('generate');
generateBtn.addEventListener('click', genWeatherData);

/* Get data from input and execute OpenWeatherMap API */
function genWeatherData(e) {
    e.preventDefault();

    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feeling').value;

    if (zipCode !== '') {
        generateBtn.classList.remove('invalid');
        getWeatherData(baseUrl, zipCode, apiKey)
            .then(function(data) {
                postData('/add', { temp: convertKelvinToCelsius(data.main.temp), date: newDate, content: content });
            }).then(function() {
                genHTMLWeatherData()
            }).catch(function(error) {
                console.log(error);
                alert('The zip code is invalid. Try again');

            });
        formInput.reset();
    } else {
        /* Prevent user don't have input */
        generateBtn.classList.add('invalid');
    }
}

/* Function to POST data */
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
};

/* Function to GET Web API Data*/
const getWeatherData = async(baseUrl, zipCode, apiKey) => {
    const res = await fetch(`${baseUrl}?q=${zipCode}&appid=${apiKey}`);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
};

/* Function gen HTML in DOM*/
const genHTMLWeatherData = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        if (allData.date !== undefined && allData.temp !== undefined && allData.content !== undefined) {
            document.getElementById('date').innerHTML ="Date : " + allData.date;
            document.getElementById('temp').innerHTML = "Temp : " + allData.temp + ' °C';
            if (allData.content){
                document.getElementById('content').innerHTML = "Your feeling today : " + allData.content;
            }
        }
    } catch (error) {
        console.log('error', error);
    }
};

/* Function convert temperature from Kelvin to Celsius */
function convertKelvinToCelsius(kelvin) {
    if (kelvin < (0)) {
        return 'below absolute zero (0 K)';
    } else {
        return (kelvin - 273.15).toFixed(2);
    }
}