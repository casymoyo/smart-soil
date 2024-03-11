import React, { useEffect, useState } from 'react'
import Weather from './Weather'
// import Weather from './Weather.hmtl'
import { db } from '../Firebase';
import { off, onValue, ref } from 'firebase/database';
import SoilMoistureGraph from '../Graphs/SoilMoistureGraph';
import PhGraph from '../Graphs/PhGraph';

export default function Dashboard() {
    const [soilMoistureData, setSoilMoistureData] = useState({});
    const [pHData, setPhData] = useState({})


    const sendDataToLocalDatabase = async (data) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/sensors/soil-moisture/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
               {value:data['moisture']}
            ),
            });

            if (!response.ok) {
            console.error('Error sending data to DRF:', response.statusText);
            } else {
            console.log('Data sent successfully!');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const sendDataToLocalDatabasePh = async (data) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/sensors/ph/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
               {value:data['ph_reading']}
            ),
            });

            if (!response.ok) {
            console.error('Error sending data to DRF:', response.statusText);
            } else {
            console.log('Data sent successfully!', data['ph_reading']);
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

  useEffect(() => {
    const soilMoistureRef = ref(db, `soil_moisture_data`); 
    

    onValue(soilMoistureRef, (snapshot) => {
      const data = snapshot.val();
      setSoilMoistureData(data);
      sendDataToLocalDatabase(data)
      console.log('Soil moisture data:', data['moisture']); 
    }, (error) => {
      console.error('Error fetching soil moisture data:', error); 
    });
    
    return () => off(soilMoistureRef);
  }, [])

  useEffect(()=>{
    const phRef = ref(db, 'pH');
    onValue(phRef, (snapshot)=>{
        const data = snapshot.val();
        setPhData(data)
        sendDataToLocalDatabasePh(data)
        console.log('pH data:', data)
    }, (error) => {
        console.error('Error fetching soil moisture data:', error); 
    })
    return () => off(phRef);
  }, [])

  return (
    <main class=" dashboard container mt-2 ">
        <div>
            <div class="row py-2">
                <div class="col px-2">
                    <div class="card shadow">
                        <div class="card-body bg-secondary text-light">
                            <h5>Soil Moisture</h5>
                            <p>{((soilMoistureData['moisture']/2300)*100).toFixed(2)}%</p>
                        </div>
                    </div>
                </div>
                <div class="col px-2">
                    <div class="card shadow">
                        <div class="card-body bg-secondary text-light">
                            <h5>Soil pH</h5>
                            <p>{pHData['ph_reading']}</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card shadow">
                        <div class="card-body bg-secondary text-light">
                            <h5>GPS cordinates</h5>
                            <p>lat: 45ere56.13</p>
                            <p>lon: 1132434.12</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr/>
        <div class="container">
            <h4>Graphs</h4>
            <div class="d-flex flex-column align-items-center " style={{"height":""}}>
                {/* <Weather/> */}
                <div>
                    <SoilMoistureGraph/>
                </div>
                <div>
                    <PhGraph/>
                </div>
            </div>
        </div>
        <hr/>
        <div class="container">
            <h5>Soil Tips</h5>
            <div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt pariatur, voluptatum sint quam consequatur vel optio porro ipsa earum nulla.</p>
            </div>
        </div>
    </main>
  )
}
