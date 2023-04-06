const express = require('express');
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');
const cors = require('cors');
const app = express();

// Set up body-parser middleware to parse JSON data
app.use(bodyParser.json());



app.get('/', (req,res) => {
  res.send('hello')
})
// Set up a POST endpoint to make predictions
app.post('/predict', (req, res) => {
  // Get the website name from the request body
  
  const websiteName = req.body.websiteName;

  // Use PythonShell to run a Python script that loads the model and makes a prediction
  const options = {
    mode: 'text',
    pythonOptions: ['-u'], // unbuffered stdout and stderr
    scriptPath: '',
    args: [websiteName]
  };
  PythonShell.run('predict.py', options, (err, results) => {
    if (err) throw err;
    const prediction = results[0];
    // Send the prediction as a response
    res.json({ prediction: prediction });
  });
});
app.use(cors());

// Start the server
app.listen(4000, () => {
  console.log('Server listening on port 4000');
});
