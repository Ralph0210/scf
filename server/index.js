const express = require('express');
const cors = require('cors');
const db = require('./models')
const { s2019, s2016, s2013, s2010 } = require('./models'); // Import your Sequelize models

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Define a route to retrieve the first five HHSEX values from the s2019 model
app.get('/getFirstFiveHHSEX', async (req, res) => {
    try {
      // Query s2019 to get the first 5 HHSEX values
      const s2019Data = await s2013.findAll({
        attributes: ['HHSEX'],
        limit: 5,
      });
  
      // Format the data as an object with a 'data' property
      const responseData = {
        year: 2019,
        data: s2019Data,
      };
  
      // Respond with the formatted data as JSON
      res.json(responseData);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
})
