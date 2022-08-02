const express = require('express');
const db = require('../config/db')
const Gig = require('../models/Gig')
const {Sequelize} = require('sequelize')

const Op = Sequelize.Op;


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
router.get('/add', (req, res) => res.render('add', {errors: "", title: "", technologies: "", budget: "", description: "", contact_email: ""}))



//Add a gig
router.post('/add', (req, res) => {
    let {title, technologies, budget, description, contact_email} = req.body

    let errors = [];
//valisate fields
    if(!title){
        errors.push({text: 'Title can not be empty'})
    }
    if(!technologies){
        errors.push({text: 'Technologies can not be empty'})
    }
    if(!description){
        errors.push({text: 'Description can not be empty'})
    }
    if(!contact_email){
        errors.push({text: 'Email can not be empty'})
    }

    //Check for errors

    if(errors.length > 0)
    {
        res.render('add', {errors, title, technologies, budget, description, contact_email})
        
    } else {
        if(!budget){
            budget = 'Unknown';
        } else {
            budget = `₦${budget}`
        }

        //make lowercase and remove space after 
        technologies = technologies.toLowerCase();

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
    }

});

router.get('/search', (req, res) => {
    let {term} = req.query;

    term = term.toLowerCase

    Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
    .then(gigs => res.render('gigs', { gigs }))
    .catch(err => console.log(err))

})
module.exports = router
