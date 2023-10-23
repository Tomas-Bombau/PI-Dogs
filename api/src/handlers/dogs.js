const Router = require('express')
const dogs = Router()


dogs.get('/', (req, res) =>{
    try {
        res.status(200).send('Funciona ruta GET dogs')
    } catch (error) {
       
    }
})

dogs.get('/name', (req, res) =>{
    const {name} = req.query
    try {
        res.status(201).send(`Funciona ruta GET name dogs`)
    } catch (error) {   
        
    }
})

dogs.get('/:idRaza/', (req, res) =>{
    const {idRaza} = req.params
    try {
        res.status(200).send(`Funciona ruta GET id ${idRaza} dogs`)
    } catch (error) {
       
    }
})


dogs.post('/', (req, res) =>{
    try {
        res.status(200).send('Funciona ruta POST dogs')
    } catch (error) {
       
    }
})

module.exports = dogs