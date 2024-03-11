import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { VictoryChart, VictoryLine } from 'victory';

export default function PhGraph() {
    const [pHData, setpHData] = useState([]);

    const updatepHData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/sensors/ph/');
        const formattedData = response.data.map(item => ({
          x: new Date(item.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          y: parseFloat(item.value),
        }));
        setpHData(formattedData);
      } catch (error) {
        console.error('Error fetching soil moisture data:', error.message);
      }
    };
  
    useEffect(() => {
      const fetchDataInterval = setInterval(updatepHData, 120000); // Update every 2 minutes
  
      return () => clearInterval(fetchDataInterval);
    }, []);
  
    if (!pHData || !pHData.length) {
      return <p>No soil ph data available.</p>;
    }
    console.log(pHData)
    return (
      <div className="chart-container">
        <h2>Soil Ph Chart</h2>
        <VictoryChart>
          <VictoryLine
            data={pHData}
            x="x" // Use "x" for the time axis
            y="y" // Use "y" for the soil moisture value
            style={{
              data: { stroke: "red" } // Medium green color
            }}
          />
        </VictoryChart>
      </div>
    );
}
