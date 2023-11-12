const { error } = require("console");
const User = require("../models/user.model");

const bcrypt = require("bcrypt");
/**
 * @param {Request} req
 * @param {Response} res
 */

const crearUsuario = (req, res) => {
  let parametros = req.body;
  const user = new User(parametros);

  User.find({
    $or: [{ username: user.username.toLowerCase() }],
  })
    .exec() // Agrega .exec() para ejecutar la consulta
    .then((users) => {
      if (users && users.length >= 1) {
        return res.status(200).json({
          status: "success",
          msg: "Usuario existente",
        });
      } else {
        // Guarda el usuario y devuelve una respuesta
        return user
          .save()
          .then(() => {
            return res.status(201).json({
              status: "success",
              msg: "Usuario creado",
            });
          })
          .catch((error) => {
            return res.status(500).json({
              status: "error",
              msg: "Error al guardar el usuario",
            });
          });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        msg: "Error en la conexión",
      });
    });
};



const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "El usuario o la contraseña no existe" });
    }

    //const isCorrectCredentials = await bcrypt.compare(password, user.password);

    if (password===user.password) {
      // No es necesario convertir a JSON, puedes enviar directamente el objeto del usuario
      return res.status(200).json(user);
    } else {
      return res.status(401).json({ error: "El usuario o la contraseña son incorrectas" });
    }
  } catch (error) {
    console.error('Error en la autenticación:', error);
    return res.status(500).json({ error: "Error en la autenticación" });
  }
};


const actualizarUsuario = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuario no encontrado',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Usuario actualizado correctamente',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error en la conexión',
    });
  }
};

const actualizarPassword = async (req, res) => {
  const username = req.params.username;  
  const updateData = req.body;

  try {
    const user = await User.findOneAndUpdate(
      {username}, // Debes especificar el campo _id
      updateData,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Documento no encontrado',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'User actualizado correctamente',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error en la conexión',
    });
  }
};

const listarUsers = async (req, res) => {
  
  const user = await User.find({});

  if (!user) {
    throw new Error("El Archivo no existente");
  }
  console.log("correcto-------")
    const documentJson = JSON.stringify(user);
    console.log(documentJson);
    return res.status(201).json(user);
};

module.exports = {
  crearUsuario,
  login,
  actualizarUsuario,
  listarUsers,
  actualizarPassword
};
