let heading = document.querySelector('.headlines');

setInterval( () => {
 let hue = 'rgb(' + (Math.floor(Math.random() * 256)) +
    ',' +
    (Math.floor(Math.random() * 256)) +
    ',' +
    (Math.floor(Math.random() * 256)) + ')';

  heading.style.color = hue;
}, 2500);

const button = document.querySelector('.weather-button');
button.addEventListener('click', 
  async () =>{
    const city_name = document.querySelector('#city_name_input').value;
    
    document.querySelector('.city>#l').innerHTML = '';
    document.querySelector('.city>#l').classList.remove('city-request');
    document.querySelector('.weather-response').style.opacity = '1';
    document.querySelector('.city>#r').style.opacity = '1';
    document.querySelector('.temp').style.opacity = '1';
    document.querySelector('.pressure').style.opacity = '1';
    document.querySelector('.humidity').style.opacity = '1';
    
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city_name + '&appid=ee84a37e7d5b8377e54b8a48b942eeb1&lang=ua'
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        document.querySelector('#city_name_input').value = "";
        
        // City name
        document.querySelector('.city>#l').innerHTML= 'City :';
        document.querySelector('.city>#r').innerHTML= data.name +'('+ data.sys.country +')';

        // Temperature
        const tk = data.main.temp;
        const tc = Math.round(tk - 273.15) + '&deg;C';
        document.querySelector('.temp>#l').innerHTML= 'Temperature :';
        document.querySelector('.temp>#r').innerHTML= tc;
        
        // Pressure
        const hPa = data.main.pressure;
        const Hg = Math.round(hPa * 0.75) + ' mm Hg';
        document.querySelector('.pressure>#l').innerHTML='Pressure :';
        document.querySelector('.pressure>#r').innerHTML= Hg;
        
        // Humidity
        const Hm = data.main.humidity + '%';
        document.querySelector('.humidity>#l').innerHTML='Humidity :';
        document.querySelector('.humidity>#r').innerHTML= Hm;
        
        // icon
        const icon_id = data.weather[0].icon;
        const urlicon ='https://openweathermap.org/img/wn/'+icon_id+'.png'
        document.querySelector('div.icon>img').setAttribute('src', urlicon);
        document.querySelector('div.icon>img').style.width = '150px';
        document.querySelector('div.icon>img').style.height = '150px';

        // Date
        const date = new Date();
        const dat = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const options = { weekday: 'short'};
        const dayweek = new Intl.DateTimeFormat('en-US', options).format(date);
        document.querySelector('.dat').innerHTML = dat + '.';
        document.querySelector('.month').innerHTML = month + '.';       
        document.querySelector('.year').innerHTML = year;
        document.querySelector('.dayweek').innerHTML = dayweek ;
      
        // Grounds for seasons
        if(month == 1 || month ==2 || month ==12) {
          document.querySelector('div.ground').classList.add('ground-winter');
        }else 
        if(month == 3 || month ==4 || month == 5) {
         document.querySelector('div.ground').classList.add('ground-spring');
        }else 
        if(month == 6 || month == 7 || month == 8) {
          document.querySelector('div.ground').classList.add('ground-summer');
        }else
        if(month == 9 || month == 10 || month == 11) {
          document.querySelector('div.ground').classList.add('ground-autumn');
        }  
    } catch (e) {
      document.querySelector('.weather-response').style.opacity = '0';
      document.querySelector('.city>#r').style.opacity = '0';
      document.querySelector('.temp').style.opacity = '0';
      document.querySelector('.pressure').style.opacity = '0';
      document.querySelector('.humidity').style.opacity = '0';
      document.querySelector('.city>#l').innerHTML = 'Enter name of city';
      document.querySelector('.city>#l').classList.add('city-request');
      document.querySelector('div.ground').classList.remove('ground-winter', 'ground-spring', 'ground-summer', 'ground-autumn');
    }
  }
)

