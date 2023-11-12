const {Router} = require('express');
const { login, crearUsuario, actualizarUsuario, listarUsers } = require('../controllers/user.controller');

const router = Router();

router.post('/new-user', crearUsuario)

router.post('/login', login)
router.put('/users/:id', actualizarUsuario);
router.get('/listar-users', listarUsers);


module.exports= router;