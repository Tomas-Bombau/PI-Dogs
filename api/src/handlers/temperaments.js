const Router = require('express')
const temperaments = Router()


temperaments.get('/', async (req, res) =>{
    try {
        res.status(200).send('Funciona ruta temperamets')
    } catch (error) {
       
    }
})

module.exports = temperaments