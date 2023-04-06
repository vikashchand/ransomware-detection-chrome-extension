import React, { useState } from 'react';
import axios from 'axios';


function MyComponent() {
  const [websiteName, setWebsiteName] = useState('');
  const [prediction, setPrediction] = useState(null);

  // Handle input change
  const handleInputChange = (event) => {
    setWebsiteName(event.target.value);
  }

  // Make a prediction using the machine learning model
  const predict = async () => {
    try {
      const response = await axios.post('http://localhost:4000/predict', { websiteName });
      const data = response.data;
      setPrediction(data.prediction);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <input type="text" value={websiteName} onChange={handleInputChange} />
      <button onClick={predict}>Predict</button>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
}

export default MyComponent;
