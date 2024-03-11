import React, { useEffect, useState } from 'react';
import  moment  from 'moment';
import { Dimmer, Loader } from 'semantic-ui-react';
import { FaCloud, FaCloudRain, FaSun } from 'react-icons/fa';
import loader from '../assets/images/loading.gif';

export default function Weather() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  // #424242
  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=57ade84f696a4171642f40322f39bb2b`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
    fetchData();
  }, [lat,long])

  console.log(long, lat, data, process.env.REACT_APP_API_KEY)
  return (
    <>
    {(typeof data.main != 'undefined') ? (
        <div className='card text-light shadow' style={{'background': '#01579b', 'borderColor': 'none !important'}}>
          <div className='card-board container'>
              <h5 className='py-2'>{data.name}</h5>
              <p><small>{moment().format('dddd')}</small> 
                <small>{moment().format('LL')}</small>
              </p>
              <div className='content'>
                <p className='d-flex justify-content-between'>
                  <span>Temperature</span>
                  <span>{data.main.temp} &deg;C</span> 
                </p>
                <p className='d-flex justify-content-between'>
                 <span>Humidity:</span>
                 <span>{data.main.humidity} %</span>
                </p>
                <p className='d-flex justify-content-between'>
                  <span>Description</span> 
                  <span>{data.weather[0].description}</span>
                </p>
              </div>
          </div>
        </div>
      ): (
        <div className='d-flex align-items-center justify-content-center' style={{'height':'30vh'}}>
          <Dimmer active>
            <Loader>
              <img src={loader} alt='loader'/>
              <p>
                <small>weather data loading...</small>
              </p>
            </Loader>
          </Dimmer>
       </div>
     )}
    </>
  )
}
