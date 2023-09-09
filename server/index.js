//setup
const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql2');

app.use(express.json())
app.use(cors())

const db = require('./models')


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'Rain0210', // Replace with your MySQL password
    database: 'scf', // Replace with your MySQL database name
  });

// const Model2019s = require('./models/2019s')

// app.get('/query2019s', async (req, res) => {
//     try {
//       // Query the first 5 rows of the 2019s table and select the HHSEX variable
//       const result = await Model2019s.findAll({
//         attributes: ['HHSEX'],
//         limit: 5,
//       });
  
//       res.json(result);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'An error occurred' });
//     }
//   });
  
  app.get('/fetchData', (req, res) => {
    const query = 'SELECT HHSEX FROM s2019 LIMIT 5'; // Replace 'your_table' with your actual table name
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.json(results);
      }
    });
  });
  



db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001")
    })
})

