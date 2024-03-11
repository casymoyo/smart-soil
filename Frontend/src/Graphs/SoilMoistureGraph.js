import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { VictoryChart, VictoryLine } from 'victory'; // Assuming you're using Victory Charts

const SoilMoistureGraph = () => {
  const [soilMoistureData, setSoilMoistureData] = useState([]);

  const updateSoilMoistureData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/sensors/soil-moisture/');
      const formattedData = response.data.map(item => ({
        x: new Date(item.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        y: parseFloat(item.value),
      }));
      setSoilMoistureData(formattedData);
    } catch (error) {
      console.error('Error fetching soil moisture data:', error.message);
    }
  };

  useEffect(() => {
    const fetchDataInterval = setInterval(updateSoilMoistureData, 120000); // Update every 2 minutes

    return () => clearInterval(fetchDataInterval);
  }, []);

  if (!soilMoistureData || !soilMoistureData.length) {
    return <p>No soil moisture data available.</p>;
  }
  console.log(soilMoistureData)
  return (
    <div className="chart-container">
      <h2>Soil Moisture Chart</h2>
      <VictoryChart>
        <VictoryLine
          data={soilMoistureData}
          x="x" // Use "x" for the time axis
          y="y" // Use "y" for the soil moisture value
          style={{
            data: { stroke: "#02B878" } // Medium green color
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default SoilMoistureGraph;

