    const Body = document.getElementById('body')
    const searchBtn = document.getElementById('search-btn')
    const timeSelect = document.getElementById('time selector')
    let butexist = 0
    let is_cel = 1
    let is_menu_on = 0
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayin = 1
    let timein = 25


function celtofar(){
    if(is_cel==1){
        let isCelBtn = document.getElementById('iscel')
        is_cel = 0
        isCelBtn.innerHTML = "Celsius"
    }
    else{
        let isCelBtn = document.getElementById('iscel')
        is_cel = 1
        isCelBtn.innerHTML = "Fahrenheit"
    }
    const City = document.getElementById('city')
    place = "http://api.weatherapi.com/v1/forecast.json?key=1f1c2e0b17bd45daaa6130635250403&q="+City.value+"&days=8&aqi=no&alerts=no"
    search(place)
}
width()
async function fetchData(url) {
    
        const response = await fetch(url);
       
        let data = await response.json();

        return data;
}
function searchinginprocess(){

    document.addEventListener('keydown',event => {
            if(event.key === 'Enter'){
            searchCity()
        }
    })
    console.log('searching')
}

let place = 'nyc'
function searchCity(){
    const City = document.getElementById('city')
    place = "http://api.weatherapi.com/v1/forecast.json?key=1f1c2e0b17bd45daaa6130635250403&q="+City.value+"&days=8&aqi=no&alerts=no"

    search(place)
}

async function search(plac){
    dataret =await fetchData(plac)
    
    const err = document.getElementById('error')
    try{
        df = await dataret.error.code
        if(df>1){
        err.innerHTML = `<h1>This City Not Found</h1><h2> Enter a Valid City</h2>`}}
    catch(error){}
    
        locat(dataret.location)
        currentData(dataret.current)
        today(dataret.forecast)
        Tomorrow(dataret.forecast,dayin,timein)
        hourly(dataret.forecast,dataret.location)
        isDay = await dataret.current.is_day
        if (isDay===1){
            document.body.classList.add('lytmode')
            err.innerHTML = ``
        }
        else{document.body.classList.remove('lytmode')
            err.innerHTML = ``
        }
    

    
    
    

}
async function locat(region){
    locationName = await region.name
    locationReg = await region.region
    locationCountry = await region.country
    locationLat = await region.lat
    locationLon = await region.lon
    const locationNameblck = document.getElementsByClassName('location-names')
    locationNameblck[0].innerHTML = `<h1>${locationName}</h1><h6>${locationReg},${locationCountry}</h6>`
    const latLong = document.getElementsByClassName('latlong')
    latLong[0].innerHTML = `<h3>Lat:${locationLat}</h3><h3>Lon:${locationLon}</h3>`
}

async function currentData(file) {
    if (is_cel === 0){cTemp =await file.temp_f+"°F"}
    else{cTemp =await file.temp_c+"°C"}
    cHum = await file.humidity
    cPresp =await file.precip_mm
    cSitu = await file.condition.text
    cWindSpeed = await file.wind_kph
    cWindDir = await file.wind_dir
    cPreasure = await file.pressure_mb
    cVisibility = await file.vis_km
    cLast = await file.last_updated
    const currentInfo1 =document.getElementById('current-info1')
    const currentInfo2 =document.getElementById('current-info2')
    currentInfo1.innerHTML=`<h1>Temp : ${cTemp}</h1>
                            <h4>Precipitation : ${cPresp}mm</h4>
                            <h4>Visibility : ${cVisibility}Km</h4>
                            <p>Last Updated : ${cLast}</p>`
    currentInfo2.innerHTML=`<h2>${cSitu}</h2>
                            <h4>Humidity : ${cHum}%</h4>
                            <h6>Pressure : ${cPreasure}mbar</h6>
                            <h6>Wind Speed  : ${cWindSpeed}Kmph</h6>
                            <h6>Wind Direction : ${cWindDir}</h6>`
}

async function today(forecast) {
    if (is_cel === 0){fMaxTemp = await forecast.forecastday[0].day.maxtemp_f+"°F"}
    else{fMaxTemp = await forecast.forecastday[0].day.maxtemp_c+"°C"}
    if (is_cel === 0){fMinTemp = await forecast.forecastday[0].day.mintemp_f+"°F"}
    else{fMinTemp = await forecast.forecastday[0].day.mintemp_c+"°C"}
    if (is_cel === 0){fAvgTemp = await forecast.forecastday[0].day.avgtemp_f+"°F"}
    else{fAvgTemp = await forecast.forecastday[0].day.avgtemp_c+"°C"}
    fHum = await forecast.forecastday[0].day.avghumidity
    fPresp = await forecast.forecastday[0].day.totalprecip_mm
    fPrespProb = await forecast.forecastday[0].day.daily_chance_of_rain
    fSitu = await forecast.forecastday[0].day.condition.text
    fWindSpeed = await forecast.forecastday[0].day.maxwind_kph
    fSunRise = await forecast.forecastday[0].astro.sunrise
    fSunSet = await forecast.forecastday[0].astro.sunset
    fMoon = await forecast.forecastday[0].astro.moon_phase
    const todayBlck = document.getElementById('Today')
    todayBlck.innerHTML =  `<h1>Today</h1>
                            <div class="today-temp">
                                <h5>Min Temp : ${fMinTemp}</h5>
                                <h5>Max Temp : ${fMaxTemp}</h5>
                                <h5>Avg Temp : ${fAvgTemp}</h5>
                            </div>
                            <div class="today-info2">
                                <h2>${fSitu}</h2>
                            </div>
                            <div class="today-info3">
                                <h5>Precipitation : ${fPresp}mm</h5>
                                <h6>Probability of Precipitation : ${fPrespProb}%</h6>
                            </div>
                            <div class="today-info3">
                                <h6>Sun Rise : ${fSunRise}</h6>
                                <h6>Moon Phase : ${fMoon}</h6>
                                <h6>Sun Set : ${fSunSet}</h6>
                            </div> 
                            <div class="today-info3">
                                <h5>Humidity : ${fHum}%</h5>
                                <h5>Wind Speed : ${fWindSpeed}Kmph</h5>
                            </div>`
}
function width(){
    const btns = document.getElementById('btns')
    if (window.innerWidth < 1000 && butexist === 0) {
        btns.innerHTML =   `<div class="divofnavbtn"><button id="iscel" onclick="celtofar()" class="navbtn">Fahrenheit</button></div>`
        const hambur = document.createElement("div")
        hambur.classList.add('hamburgermenu')
        hambur.innerHTML = `<button onclick="menu()" id="hamburger-menu-but">
                            <svg class="hamburger-menu-but" xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" ><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
                            </button>`
        btns.parentNode.appendChild(hambur)
        butexist = 1
    }
    if (window.innerWidth > 1000 && butexist === 1) {
        butexist = 0
        btns.innerHTML =`<div class="divofnavbtn"><button id="iscel" onclick="celtofar()" class="navbtn">Fahrenheit</button></div>
                        <div class="divofnavbtn"><a href="#Current"><button class="navbtn">Current</button></a></div>
                        <div class="divofnavbtn"><a href="#Hourly"><button class="navbtn">Hourly</button></a></div>
                        <div class="divofnavbtn"><a href="#Forecast"><button class="navbtn">Forecast</button></a></div>`
        const hamb = document.getElementsByClassName('hamburgermenu')
        hamb[0].remove()
        if(is_menu_on){
            is_menu_on = 0
            let listElements = document.getElementsByClassName('navlistbtns')
            listElements[0].remove()
        }
    }
}
window.addEventListener("resize",width)
window.addEventListener("resize",width1)
window.addEventListener('scroll', scrl);

function scrl(){
    const scrollPosition = window.scrollY;
    const navigators = document.getElementById('navsid')
    navNo = 0
    if (scrollPosition > 100 && navNo === 0) {
        navigators.classList.add('navscroll')
        navNo = 1
    }
    else{
        navigators.classList.remove('navscroll')
        navNo = 0
    }
    try{
        const navlistbtns = document.getElementsByClassName('navlistbtns')
        if (scrollPosition > 100) {
        navlistbtns[0].remove()
        const menBut = document.getElementById('hamburger-menu-but')
        is_menu_on = 0
        menBut.innerHTML = `<svg class="hamburger-menu-but" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>`
        let listElements = document.getElementsByClassName('navlistbtns')
        listElements[0].remove()
        }
    }
    catch(error){
    }
    
}
   
function menu(){
    const menBut = document.getElementById('hamburger-menu-but')
    if(is_menu_on === 0){
        is_menu_on = 1
        menBut.innerHTML = `<svg class="hamburger-menu-but" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`
        const listElements = document.createElement("nav")
        listElements.classList.add('navlistbtns')
        listElements.innerHTML =   `<div class="divofnavbtn1"><a href="#Current"><button class="navbtn"><h1>Current</h1></button></a></div>
                                    <div class="divofnavbtn1"><a href="#Hourly"><button class="navbtn"><h1>Hourly</h1></button></a></div>
                                    <div class="divofnavbtn1"><a href="#Forecast"><button class="navbtn"><h1>Forecast</h1></button></a></div>`
        Body.appendChild(listElements)

    }
    else{
        is_menu_on = 0
        menBut.innerHTML = `<svg class="hamburger-menu-but" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>`
        let listElements = document.getElementsByClassName('navlistbtns')
        listElements[0].remove()
    }
}

async function Tomorrow(forecast,i,y) {
    if (is_cel === 0){tfMaxTemp = await forecast.forecastday[i].day.maxtemp_f+"°F"}
    else{tfMaxTemp = await forecast.forecastday[i].day.maxtemp_c+"°C"}
    if (is_cel === 0){tfMinTemp = await forecast.forecastday[i].day.mintemp_f+"°F"}
    else{tfMinTemp = await forecast.forecastday[i].day.mintemp_c+"°C"}
    if (is_cel === 0){tfAvgTemp = await forecast.forecastday[i].day.avgtemp_f+"°F"}
    else{tfAvgTemp = await forecast.forecastday[i].day.avgtemp_c+"°C"}
    tfHum = await forecast.forecastday[i].day.avghumidity
    tfPresp = await forecast.forecastday[i].day.totalprecip_mm
    tfPrespProb = await forecast.forecastday[i].day.daily_chance_of_rain
    tfSitu = await forecast.forecastday[i].day.condition.text
    tfWindSpeed = await forecast.forecastday[i].day.maxwind_kph
    tfSunRise = await forecast.forecastday[i].astro.sunrise
    tfSunSet = await forecast.forecastday[i].astro.sunset
    tfMoon = await forecast.forecastday[i].astro.moon_phase
    const todayBlck = document.getElementById('Forecast')
    if(y===25){
        if(i===1){
            todayBlck.innerHTML =  `<h1>Tomorrow</h1>
                                    <div class="today-temp">
                                        <h5>Min Temp : ${tfMinTemp}</h5>
                                        <h5>Max Temp : ${tfMaxTemp}</h5>
                                        <h5>Avg Temp : ${tfAvgTemp}</h5>
                                    </div>
                                    <div class="today-info2">
                                        <h2>${tfSitu}</h2>
                                    </div>
                                    <div class="today-info3">
                                        <h5>Precipitation : ${tfPresp}mm</h5>
                                        <h6>Probability of Precipitation : ${tfPrespProb}%</h6>
                                    </div>
                                    <div class="today-info3">
                                        <h6>Sun Rise : ${tfSunRise}</h6>
                                        <h6>Moon Phase : ${tfMoon}</h6>
                                        <h6>Sun Set : ${tfSunSet}</h6>
                                    </div> 
                                    <div class="today-info3">
                                        <h5>Humidity : ${tfHum}%</h5>
                                        <h5>Wind Speed : ${tfWindSpeed}Kmph</h5>
                                    </div>`
        }
        else{
            a= getDayOfWeek()
            todayBlck.innerHTML =  `<h1>${daysOfWeek[(i+a)%7]}</h1>
                                <div class="today-temp">
                                    <h5>Min Temp : ${tfMinTemp}</h5>
                                    <h5>Max Temp : ${tfMaxTemp}</h5>
                                    <h5>Avg Temp : ${tfAvgTemp}</h5>
                                </div>
                                <div class="today-info2">
                                    <h2>${tfSitu}</h2>
                                </div>
                                <div class="today-info3">
                                    <h5>Precipitation : ${tfPresp}mm</h5>
                                    <h6>Probability of Precipitation : ${tfPrespProb}%</h6>
                                </div>
                                <div class="today-info3">
                                    <h6>Sun Rise : ${tfSunRise}</h6>
                                    <h6>Moon Phase : ${tfMoon}</h6>
                                    <h6>Sun Set : ${tfSunSet}</h6>
                                </div> 
                                <div class="today-info3">
                                    <h5>Humidity : ${tfHum}%</h5>
                                    <h5>Wind Speed : ${tfWindSpeed}Kmph</h5>
                                </div>`
        }
    }
    else{
        if (is_cel === 0){tfhTemp = await forecast.forecastday[i].hour[y].temp_f+"°F"}
        else{tfhTemp = await forecast.forecastday[i].hour[y].temp_c+"°C"}
        if (is_cel === 0){tfhFeels = await forecast.forecastday[i].hour[y].feelslike_f+"°F"}
        else{tfhFeels = await forecast.forecastday[i].hour[y].feelslike_c+"°C"}
        tfhSitu = await forecast.forecastday[i].hour[y].condition.text
        tfhPrecp = await forecast.forecastday[i].hour[y].precip_mm
        tfhPrecpProb = await forecast.forecastday[i].hour[y].chance_of_rain
        tfhHum = await forecast.forecastday[i].hour[y].humidity
        tfhWindSpeed = await forecast.forecastday[i].hour[y].wind_kph
        tfh = await forecast.forecastday[i].hour[y].time.split(' ')[1]
        if(i===1){
            todayBlck.innerHTML =  `<h1>Tomorrow</h1>
                                    <div class="today-temp">
                                        <h5>Min Temp : ${tfMinTemp}</h5>
                                        <h5>Max Temp : ${tfMaxTemp}</h5>
                                        <h5>Avg Temp : ${tfAvgTemp}</h5>
                                    </div>
                                    <div class="today-info2">
                                        <h2>${tfSitu}</h2>
                                    </div>
                                    <div class="today-info3">
                                        <h5>Precipitation : ${tfPresp}mm</h5>
                                        <h6>Probability of Precipitation : ${tfPrespProb}%</h6>
                                    </div>
                                    <div class="today-info3">
                                        <h6>Sun Rise : ${tfSunRise}</h6>
                                        <h6>Moon Phase : ${tfMoon}</h6>
                                        <h6>Sun Set : ${tfSunSet}</h6>
                                    </div> 
                                    <div class="today-info3">
                                        <h5>Humidity : ${tfHum}%</h5>
                                        <h5>Wind Speed : ${tfWindSpeed}Kmph</h5>
                                    </div>
                                    <div class="today-info4">
                                        <h2>Hour : ${tfh}</h2>
                                    </div>
                                    <div class="today-temp">
                                        <h5>Temp : ${tfhTemp}</h5>
                                        <h5>Feels like : ${tfhFeels}</h5>
                                    </div>
                                    <div class="today-info2">
                                        <h2>${tfhSitu}</h2>
                                    </div>
                                    <div class="today-info3">
                                        <h6>Precipitation :${tfhPrecp}mm</h6>
                                        <h6>Probability of Precipitation :${tfhPrecpProb}%</h6>
                                    </div> 
                                    <div class="today-info3">
                                        <h5>Humidity : ${tfhHum}%</h5>
                                        <h5>Wind Speed : ${tfhWindSpeed}Kmph</h5>
                                    </div>`
        }
        else{
            a= getDayOfWeek()
            todayBlck.innerHTML =  `<h1>${daysOfWeek[(i+a)%7]}</h1>
                                <div class="today-temp">
                                    <h5>Min Temp : ${tfMinTemp}</h5>
                                    <h5>Max Temp : ${tfMaxTemp}</h5>
                                    <h5>Avg Temp : ${tfAvgTemp}</h5>
                                </div>
                                <div class="today-info2">
                                    <h2>${tfSitu}</h2>
                                </div>
                                <div class="today-info3">
                                    <h5>Precipitation : ${tfPresp}mm</h5>
                                    <h6>Probability of Precipitation : ${tfPrespProb}%</h6>
                                </div>
                                <div class="today-info3">
                                    <h6>Sun Rise : ${tfSunRise}</h6>
                                    <h6>Moon Phase : ${tfMoon}</h6>
                                    <h6>Sun Set : ${tfSunSet}</h6>
                                </div> 
                                <div class="today-info3">
                                    <h5>Humidity : ${tfHum}%</h5>
                                    <h5>Wind Speed : ${tfWindSpeed}Kmph</h5>
                                </div>
                                <div class="today-info4">
                                        <h2>Hour : ${tfh}</h2>
                                    </div>
                                    <div class="today-temp">
                                        <h5>Temp : ${tfhTemp}</h5>
                                        <h5>Feels like : ${tfhFeels}</h5>
                                    </div>
                                    <div class="today-info2">
                                        <h2>${tfhSitu}</h2>
                                    </div>
                                    <div class="today-info3">
                                        <h6>Precipitation :${tfhPrecp}mm</h6>
                                        <h6>Probability of Precipitation :${tfhPrecpProb}%</h6>
                                    </div> 
                                    <div class="today-info3">
                                        <h5>Humidity : ${tfhHum}%</h5>
                                        <h5>Wind Speed : ${tfhWindSpeed}Kmph</h5>
                                    </div>`
        }
    }
}

async function hourly(hdata,tdata) {
    const hourdata = document.getElementsByClassName('hourforecast')
    const now = await tdata.localtime_epoch
    for(i=0;i<24;i++){
       if( hdata.forecastday[0].hour[i].time_epoch>now){
        break;
       }
    }
    i=i-1
    hSitu = await hdata.forecastday[0].hour[i].condition.text
    hHum = await hdata.forecastday[0].hour[i].humidity
    if (is_cel === 0){hTemp = await hdata.forecastday[0].hour[i].temp_f+"°F"}
    else{hTemp = await hdata.forecastday[0].hour[i].temp_c+"°C"}
    hPrec = await hdata.forecastday[0].hour[i].precip_mm
    if(i===23){
        i=0
        hSitu1 = await hdata.forecastday[1].hour[i].condition.text
        hHum1 = await hdata.forecastday[1].hour[i].humidity
        if (is_cel === 0){hTemp1 = await hdata.forecastday[1].hour[i].temp_f+"°F"}
        else{hTemp1 = await hdata.forecastday[1].hour[i].temp_c+"°C"}
        hPrec1 = await hdata.forecastday[1].hour[i].precip_mm
    }
    else{
        hSitu1 = await hdata.forecastday[0].hour[i+1].condition.text
        hHum1 = await hdata.forecastday[0].hour[i+1].humidity
        if (is_cel === 0){hTemp1 = await hdata.forecastday[0].hour[i+1].temp_f+"°F"}
        else{hTemp1 = await hdata.forecastday[0].hour[i+1].temp_c+"°C"}
        hPrec1 = await hdata.forecastday[0].hour[i+1].precip_mm
        }
        hourdata[0].innerHTML = `<h2>This Hour</h2>
                                <h2>Temp : ${hTemp}</h4>
                                <h2>${hSitu}</h2>
                                <h4>Precipitation : ${hPrec}mm</h4>
                                <h4>Humidity : ${hHum}%</h4>`
        hourdata[1].innerHTML = `<h2>Next Hour</h2>
                                <h2>Temp : ${hTemp1}</h4>
                                <h2>${hSitu1}</h2>
                                <h4>Precipitation : ${hPrec1}mm</h4>
                                <h4>Humidity : ${hHum1}%</h4>`
}



function getDayOfWeek() {
    const dateString = new Date();
    const dayIndex = dateString.getDay();
    return dayIndex;
}

width1()
function width1(){
    const i = getDayOfWeek()
    const selec = document.getElementById('selectors')
    if(window.innerWidth > 1000){
        selec.innerHTML = `<div id="dayslistbtns" class="date-select1">
                                <div class="date-selector"><button onclick="changeDay(1)" >Tomorrow</button></div>
                                <div class="date-selector"><button onclick="changeDay(2)" >${daysOfWeek[(i+2)%7]}</button></div>
                                <div class="date-selector"><button onclick="changeDay(3)" >${daysOfWeek[(i+3)%7]}</button></div>
                                <div class="date-selector"><button onclick="changeDay(4)" >${daysOfWeek[(i+4)%7]}</button></div>
                                <div class="date-selector"><button onclick="changeDay(5)" >${daysOfWeek[(i+5)%7]}</button></div>
                                <div class="date-selector"><button onclick="changeDay(6)" >${daysOfWeek[(i+6)%7]}</button></div>
                                <div class="date-selector"><button onclick="changeDay(7)" >${daysOfWeek[(i+7)%7]}</button></div>
                            </div>
                            <div class="time-select">
                                <label for="time">Time :</label>
                                <select class="time-selector1" name="time" id="timeselector" title="Select Time">
                                    <option value="25">Select time</option>
                                    <option value="0">00:00</option> <option value="1">01:00</option> <option value="2">02:00</option> <option value="3">03:00</option> <option value="4">04:00</option> <option value="5">05:00</option> <option value="6">06:00</option> <option value="7">07:00</option> <option value="8">08:00</option> <option value="9">09:00</option> <option value="10">10:00</option> <option value="11">11:00</option> <option value="12">12:00</option> <option value="13">13:00</option> <option value="14">14:00</option> <option value="15">15:00</option> <option value="16">16:00</option> <option value="17">17:00</option> <option value="18">18:00</option> <option value="19">19:00</option> <option value="20">20:00</option> <option value="21">21:00</option> <option value="22">22:00</option> <option value="23">23:00</option>
                                </select>
                                <button onclick="changedaytime()" class="selbtn1">Select</button>
                            </div>`
    }
    else{
        selec.innerHTML = `<div class="date-select">
                                <label for="date">Date : </label>
                                <select class="time-selector" name="date" id="dateselector" title="Select Date">
                                    <option id="dayselectionch" value="1">Tomorrow</option>
                                    <option id="dayselectionch" value="2">${daysOfWeek[(i+2)%7]}</option>
                                    <option id="dayselectionch" value="3">${daysOfWeek[(i+3)%7]}</option>
                                    <option id="dayselectionch" value="4">${daysOfWeek[(i+4)%7]}</option>
                                    <option id="dayselectionch" value="5">${daysOfWeek[(i+5)%7]}</option>
                                    <option id="dayselectionch" value="6">${daysOfWeek[(i+6)%7]}</option>
                                    <option id="dayselectionch" value="7">${daysOfWeek[(i+7)%7]}</option>
                                </select>
                            </div>
                            <div class="time-select">
                                <label for="time">Time :</label>
                                <select class="time-selector" name="time" id="timeselector" title="Select Time">
                                    <option value="25">Select time</option>
                                    <option value="0">00:00</option> <option value="1">01:00</option> <option value="2">02:00</option> <option value="3">03:00</option> <option value="4">04:00</option> <option value="5">05:00</option> <option value="6">06:00</option> <option value="7">07:00</option> <option value="8">08:00</option> <option value="9">09:00</option> <option value="10">10:00</option> <option value="11">11:00</option> <option value="12">12:00</option> <option value="13">13:00</option> <option value="14">14:00</option> <option value="15">15:00</option> <option value="16">16:00</option> <option value="17">17:00</option> <option value="18">18:00</option> <option value="19">19:00</option> <option value="20">20:00</option> <option value="21">21:00</option> <option value="22">22:00</option> <option value="23">23:00</option>
                                </select>
                            </div>
                            <div class="submitbtn">
                                <button onclick="changedaytime()" class="selbtn">Select</button>
                            </div>`
    }

}
function changeDay(i){
    if(dayin === i ){}
    else{
        dayin = i 
        changedaytime()  
    }   
}

function changedaytime(){
    try{
        const dateSel = document.getElementById('dateselector')
        dayin = Number(dateSel.value)
    }
    catch(error){}
    const timesel = document.getElementById('timeselector')
    timein = Number(timesel.value)
    const City = document.getElementById('city')
    place = "https://api.weatherapi.com/v1/forecast.json?key=c69fa4b9628b4c03a2d61709241512&q="+City.value+"&days=10&aqi=no&alerts=no"
    search(place)
    
}