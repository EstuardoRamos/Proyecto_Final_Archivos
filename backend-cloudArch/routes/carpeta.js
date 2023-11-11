const {Router} = require('express');
const { listarCarpetas,crearCarpeta, actualizarCarpetas, deletedCarpeta } = require('../controllers/carpeta.controller');
//const { listarCarpetas } = require('../controllers/document.controller');

const router = Router();


router.post('/crear-carpeta', crearCarpeta);
router.put('/update-carpeta/:nombre/:creador/:raiz', actualizarCarpetas);
router.get('/listar-carpeta/:raiz/:creador', listarCarpetas);
router.delete('/delete-carpeta/:nombre/:creador/:raiz', deletedCarpeta);

module.exports= router;