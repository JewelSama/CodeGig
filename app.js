const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const { Sequelize } = require('sequelize');

const db =  new Sequelize('codegig', 'Jewel Sama', 'Flabagasted', {
    host: 'localhost',
    dialect: 'postgres'
});

//Test connection
db.authenticate()
    .then(() => console.log('Database Connected!'))
    .catch(error => console.log( 'Error: ' + error))



const app = express()
app.get('/', (req, res) => res.send('INDEX'))


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))