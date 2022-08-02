const express = require('express');
const db = require('../config/db')
const Gig = require('../models/Gig')

const router = express.Router();
//Gett gig list
router.get('/', (req, res) => 
    Gig.findAll()
      .then(gigs => {
        res.render('gigs', {gigs:gigs})
      })
      .catch(err => console.log(err))
)

//display add gig form
router.get('/add', (req, res) => res.render('add'))



//Add a gig
router.post('/add', (req, res) => {
    const data = {
        title: 'Simple wordPress website',
        technologies: 'wordPress, html, css',
        budget: '$2500',
        description: 'To connect to the database, you must create a Sequelize instance. This can be done by either passing the connection parameters separately to the Sequelize constructor or by passing a single connection URI:',
        contact_email: 'user2@gmail.com'
    }
    let {  } = {title, technologies, budget, description, contact_email} = data

    // insert into table
    Gig.create({
        title,
        technologies,
        budget,
        description,
        contact_email,
    })
    .then(gig => res.redirect('/gigs'))
    .catch(err => console.log(err));

});
module.exports = router
