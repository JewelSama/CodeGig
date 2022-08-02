const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const db = require('./config/db')
const ejs = require('ejs')


//Test connection
db.authenticate()
    .then(() => console.log('Database Connected!'))
    .catch(error => console.log( 'Error: ' + error))



const app = express()

//ejs
app.set('view engine', 'ejs');

//Body parser
app.use(bodyParser.urlencoded({extended: false}))

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Index route

app.get('/', (req, res) => res.render('landing'))


//Gig routes
app.use('/gigs', require('./routes/gigs.routes'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))