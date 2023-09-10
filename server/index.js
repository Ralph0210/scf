const express = require('express');
const cors = require('cors');
const db = require('./models')
const { s2019, s2016, s2013, s2010 } = require('./models'); // Import your Sequelize models

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/api/survey/:year', async (req, res) => {
    const { year } = req.params;
  
    try {
      // Use dynamic model selection based on the year
      let surveyModel;
      switch (year) {
        case '2019':
          surveyModel = s2019;
          break;
        case '2016':
          surveyModel = s2016;
          break;
          case '2013':
            surveyModel = s2013;
            break;
          case '2010':
            surveyModel = s2010;
            break;
        default:
          surveyModel = null; // Handle cases where the year is not recognized
      }
  
      if (surveyModel) {
        const surveyData = await surveyModel.findAll({
          attributes: ['HHSEX'],
          limit: 5,
        });
  
        res.json(surveyData);
      } else {
        res.status(404).json({ error: 'Year not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

// Define a function to calculate and retrieve weighted mean "INCOME" for each year
async function getWeightedMeanIncomeByYear(year) {
    let data;
  
    switch (year) {
      case 2010:
        data = await s2010.findAll({
          attributes: ['INCOME', 'WGT'],
        });
        break;
      case 2013:
        data = await s2013.findAll({
          attributes: ['INCOME', 'WGT'],
        });
        break;
      case 2016:
        data = await s2016.findAll({
          attributes: ['INCOME', 'WGT'],
        });
        break;
      case 2019:
        data = await s2019.findAll({
          attributes: ['INCOME', 'WGT'],
        });
        break;
      default:
        data = [];
    }
  
    // Calculate the weighted mean
    let totalWeightedIncome = 0;
    let totalWeight = 0;
  
    for (const row of data) {
      const { INCOME, WGT } = row;
      totalWeightedIncome += INCOME * WGT;
      totalWeight += WGT;
    }
  
    if (totalWeight === 0) {
      return 0; // Avoid division by zero
    }
  
    return totalWeightedIncome / totalWeight;
  }

  // Backend route to retrieve the first 5 HHSEX values
app.get('/getFirstFiveHHSEX', async (req, res) => {
    try {
      // Query your database table to retrieve the first 5 HHSEX values
      const hhsexData = await s2019.findAll({
        attributes: ['HHSEX'],
        limit: 5,
      });
  
      // Extract the HHSEX values from the database result
      const hhsexValues = hhsexData.map((data) => data.HHSEX);
  
      res.json({ hhsexValues });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
})

// Export the function for use in your frontend
module.exports = {
    getWeightedMeanIncomeByYear,
  };
  
