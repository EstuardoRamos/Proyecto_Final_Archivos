const {Router} = require('express');
const { listarDocs, crearCompartido, deletedDoc } = require('../controllers/compartido.controller');

const router = Router();

//router.post('/newDoc', crearUsuario);

router.post('/compartir', crearCompartido);
router.get('/listar-compartido/:compartido', listarDocs);
//router.get('/obtener_doc/:nombre/:creador', listarCarpetas);
router.delete('/del-compartido/:nombre/:compartido', deletedDoc);   

module.exports= router;