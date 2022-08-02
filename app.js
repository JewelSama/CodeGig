const express = require('express')
const {engine} = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const db = require('./config/db')


//Test connection
db.authenticate()
    .then(() => console.log('Database Connected!'))
    .catch(error => console.log( 'Error: ' + error))



const app = express()

//Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.send('INDEX'))

//Gig routes
app.use('/gigs', require('./routes/gigs.routes'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))