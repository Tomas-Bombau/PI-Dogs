const Router = require('express')
const temperaments = Router()

//Getting all the temperaments
temperaments.get('/', async (req, res) =>{
    try {
        res.status(200).send('Funciona ruta temperamets')
    } catch (error) {
       
    }
})

module.exports = temperaments