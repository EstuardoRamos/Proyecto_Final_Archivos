const {Router} = require('express');
const { listarCarpetasBorradas, listarCarpetas,crearCarpeta, actualizarCarpetas, deletedCarpeta, obtnenerCarpeta } = require('../controllers/carpeta.controller');
//const { listarCarpetas } = require('../controllers/document.controller');

const router = Router();


router.post('/crear-carpeta', crearCarpeta);
router.put('/update-carpeta/:nombre/:creador/:raiz', actualizarCarpetas);
router.get('/listar-carpeta/:raiz/:creador', listarCarpetas);
router.get('/listar-carpeta-eliminadas/:creador', listarCarpetasBorradas);
router.get('/obtener-carpeta/:nombre/:creador', obtnenerCarpeta);
router.delete('/delete-carpeta/:nombre/:creador/:raiz', deletedCarpeta);

module.exports= router;