const {Router} = require('express');
const { login, crearUsuario, actualizarUsuario, listarUsers, actualizarPassword } = require('../controllers/user.controller');

const router = Router();

router.post('/new-user', crearUsuario)

router.post('/login', login)
router.put('/users/:id', actualizarUsuario);
router.put('/update-password/:username', actualizarPassword);
router.get('/listar-users', listarUsers);


module.exports= router;