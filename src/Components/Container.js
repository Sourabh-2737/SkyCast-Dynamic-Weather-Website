import React, { useState } from 'react'
// import { useEffect } from 'react';
import haze from '../Images/haze.png'
import cloud from '../Images/cloud.png'
// import storm from '../Images/storm.png'
import snow from '../Images/snow.png'
import rain from '../Images/rain.png'
import clear from '../Images/clear.png'
import axios from 'axios';

export default function Container() {

const [data, setData] = useState({});

const [location, setLocation] = useState('');

const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=4c577957fd9fc94f0d04dc2337d7e049`;

  

const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
    }
}

const showTime = (timezone) => {
    let localTime = new Date().getTime()
    let localOffset = new Date().getTimezoneOffset() * 60000
    let currentUtcTime = localOffset + localTime
    let cityOffset = currentUtcTime + 1000 * timezone
    let time = new Date(cityOffset)
    let hour = time.getHours();
    let min = time.getMinutes();
    // let sec = time.getSeconds();
    let am_pm = "AM";

    if (hour > 12) {
      hour -= 12;
      am_pm = "PM";
    }
    if (hour === 0) {
      hour = 12;
      am_pm = "AM";
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    // sec = sec < 10 ? "0" + sec : sec;
    let weekday = time.toLocaleString('default', { weekday: 'long' });
    let month = time.toLocaleString('default', { month: 'short' });
    let date = time.getDate();

    let currentTime = hour + ":"
      + min + " " + am_pm;
    // return `${currentTime}  ${weekday} , ${month} ${date}`;
    return (<div>
      <div>{currentTime}</div>
      <div>{weekday} - {month} {date}</div>
    </div>);
}

const [imageSrc, setImageSrc] = useState(haze);
const changeImg = (event) => {
    let x = data.weather ? data.weather[0].main : null;
    if (x === "Haze")
      setImageSrc(haze);
    else if (x === "Clouds")
      setImageSrc(cloud);
    else if (x === "Rain")
      setImageSrc(rain);
    else if (x === "Snow")
      setImageSrc(snow);
    else if (x === "Clear")
      setImageSrc(clear);
    else
      setImageSrc(haze);
}

return (

  <div className='row container box'>

    {data.name!== undefined && 
    <div className='leftContainer col-lg-7 col-md'>

      <div className='cityDetails'>
        <h1>{data.name}</h1>
        {data.sys ? <h2>{data.sys.country}</h2> : null}
      </div>

      {data.main ? <h1 className='temperature'>{data.main.temp}&deg;C</h1> : null}

      {data.name!== undefined && 
      <h4 className='time'>{showTime(data.timezone)}</h4>
      }
    
    </div>
    }
      


    <div className='rightContainer col-lg-5 col-md'>

      <div className='weatherIcon'> <img className='weatherImg' src={imageSrc} alt="Nothing" /> </div>

      {data.weather ? <h1 className='weatherMain'>{data.weather[0].main}</h1> : null}

        <div className='input-group search'>
          <input type="text" className='form-control' value={location} onChange={event => setLocation(event.target.value)}
            onKeyPress={(event) => {
              searchLocation(event); 
              changeImg(event);
            }}
            placeholder="Enter A Valid City" />
        </div>
        <hr />

        {data.name!== undefined && 
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {data.name!== undefined && 
              <div>
              <strong>{data.name} ,{data.sys ? <span>{data.sys.country}</span> : null}</strong>
            </div>
              }
            </li>
            <li className="list-group-item">Humidity - {data.main ? <span>{data.main.humidity}</span> : null}%</li>
            <li className="list-group-item">Wind Speed - {data.wind ? <span>{data.wind.speed}</span> : null}m/sec</li>
            <li className="list-group-item">Pressure - {data.main ? <span>{data.main.pressure}</span> : null}hPa</li>
            <li className="list-group-item"><span>Visibility - {data.visibility}m</span></li>
          </ul>
        }
        
      </div>
    </div>
  )
}
