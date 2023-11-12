const {Router} = require('express');
const {listarDocsEliminados, listarDocs, crearDocument, actualizarDoc, deletedDoc,deletedDocCarpeta } = require('../controllers/document.controller');

const router = Router();

//router.post('/newDoc', crearUsuario);

router.post('/crearDoc', crearDocument);
router.put('/updateDoc/:nombre/:creador/:raiz', actualizarDoc);
router.get('/listarDoc/:raiz/:creador', listarDocs);
router.get('/listarDoc-eliminados/:creador', listarDocsEliminados);
//router.get('/obtener_doc/:nombre/:creador', listarCarpetas);
router.delete('/del/:nombre/:creador/:raiz', deletedDoc); 
router.delete('/del-docs-carpeta/:creador/:raiz', deletedDocCarpeta);   

module.exports= router;