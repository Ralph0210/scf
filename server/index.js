const express = require("express");
const cors = require("cors");
const db = require("./models");
const { s2019, s2016, s2013, s2010 } = require("./models"); // Import your Sequelize models

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Define the tables for each year
const YearTables = {
  2010: s2010,
  2013: s2013,
  2016: s2016,
  2019: s2019,
};

app.get("/api/survey", async (req, res) => {
  const {
    selectedYear,
    selectedData,
    selectedDistribution,
    selectedDisplay,
    selectedUnit,
  } = req.query;

  try {
    // Parse selectedYear as a range (e.g., "2010-2019")
    const [startYear, endYear] = selectedYear.split("-");

    // Validate that startYear and endYear are valid numbers
    if (isNaN(startYear) || isNaN(endYear)) {
      return res.status(400).json({ error: "Invalid year range" });
    }

    // Create an array to store the results from each year's table
    const results = [];

    for (let year = parseInt(startYear); year <= parseInt(endYear); year++) {
      // Continue with your logic for these specific years
      if (YearTables[year]) {
        const whereClause = {};
        if (selectedDistribution !== "None") {
          whereClause[selectedDistribution] = selectedDisplay;
        }
        console.log(whereClause);

        const surveyData = await YearTables[year].findAll({
          where: whereClause,
          attributes: [selectedData, "WGT"],
        });
        console.log(whereClause);

        // Calculate the weighted mean if selectedUnit is "Mean"
        let weightedMean = null;
        if (selectedUnit === "Mean") {
          const totalVWGT = surveyData.reduce((acc, entry) => {
            return acc + entry.dataValues[selectedData] * entry.dataValues.WGT;
          }, 0);

          const totalWGT = surveyData.reduce((acc, entry) => {
            return acc + entry.dataValues.WGT;
          }, 0);

          weightedMean = totalVWGT / totalWGT;
        }

        // Build the desired structure for the data
        const dataObject = {
          year: year,
          [`${selectedData}-${selectedDistribution}-${selectedDisplay}`]:
            weightedMean,
        };

        results.push(dataObject);
      }
    }

    // Combine the results from each year and send them as a single response
    const combinedResults = results.flat();
    res.json(combinedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/distinct-values", async (req, res) => {
  const { selectedDistribution } = req.query;
  try {
    const distinctValues = await s2019.findAll({
      attributes: [
        [
          db.sequelize.fn("DISTINCT", db.sequelize.col(selectedDistribution)),
          "value",
        ],
      ],
      where: {
        // Add any additional conditions if needed
      },
    });

    // Map the distinct values into the desired format
    const formattedValues = distinctValues.map((item) => ({
      label: item.dataValues.value, // Use the value as the label
      value: item.dataValues.value, // Use the value as the value
    }));

    res.json(formattedValues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

db.sequelize.sync().then(() => {
  app.listen(3001,() => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

// Export the function for use in your frontend
module.exports = {};
