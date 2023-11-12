const { error } = require("console");
const Carpeta = require("../models/carpeta.model")

const bcrypt = require("bcrypt");
/**
 * @param {Request} req
 * @param {Response} res
 */
const crearCarpeta = (req, res) => {
    let parametros = req.body;
    const carpeta = new Carpeta(parametros);
  
    Carpeta.find({
      $or: [{ nombre: carpeta.nombre.toLowerCase() }],
    })
      .exec() // Agrega .exec() para ejecutar la consulta
      .then((carpetas) => {
        if (carpetas && carpetas.length >= 1) {
          return res.status(200).json({
            status: "success",
            msg: "Ya hay otro archivo con el nombre",
          });
        } else {
          // Guarda el usuario y devuelve una respuesta
          return carpeta
            .save()
            .then(() => {
              return res.status(201).json({
                status: "success",
                msg: "Documento creado",
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


const listarCarpetas = async (req, res) => {
  const raiz = req.params.raiz; 
  const creador = req.params.creador;
  const deleted= false;
  const carpeta = await Carpeta.find({ raiz, creador, deleted });

  if (!carpeta) {
    throw new Error("El Archivo no existente");
  }
  console.log("correcto-------")
    const caroetaJson = JSON.stringify(carpeta);
    console.log(caroetaJson);
    return res.status(201).json(carpeta);
};

const obtnenerCarpeta = async (req, res) => {
  const nombre = req.params.nombre; 
  const creador = req.params.creador;
  const deleted= false;
  const carpeta = await Carpeta.findOne({ nombre, creador });

  if (!carpeta) {
    throw new Error("El Archivo no existente");
  }
  console.log("correcto-------")
    const caroetaJson = JSON.stringify(carpeta);
    console.log(caroetaJson);
    return res.status(201).json(carpeta);
};


const actualizarCarpetas = async (req, res) => {
  const nombreDoc = req.params.nombre;
  const creadorR = req.params.creador;
  const raizC = req.params.raiz; 
  const updateData = req.body;

  try {
    const carpeta = await Carpeta.findOneAndUpdate(
      { nombre: nombreDoc,
        creador: creadorR,
        raiz: raizC
       }, // Debes especificar el campo _id
      updateData,
      { new: true }
    );

    if (!carpeta) {
      return res.status(404).json({
        status: 'error',
        message: 'Carpeta no encontrado',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Carpeta actualizado correctamente',
      carpeta,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error en la conexión',
    });
  }
};

const deletedCarpeta = async (req, res) => {
  const nombre = req.params.nombre; // Supongo que caroetaId es el nombre del caroetao, asegúrate de que sea el ID
  const creador = req.params.creador;
  const raiz = req.params.raiz;
  const updateData = req.body;

  try {
    const carpeta = await Carpeta.findOneAndUpdate(
      { nombre, creador, raiz},
      { deleted:true },
      { new: true }
    );

    if (!carpeta) {
      return res.status(404).json({
        status: 'error',
        message: 'Documento no encontrado',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Documento actualizado correctamente',
      carpeta,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error en la conexión',
    });
  }
};

const listarCarpetasBorradas = async (req, res) => {
  //const raiz = req.params.raiz; //cambiar al eliminar la raiz a papelera
  const deleted= true;
  const carpeta = await Carpeta.find({ deleted });

  if (!carpeta) {
    throw new Error("El Archivo no existente");
  }
  console.log("correcto-------")
    const caroetaJson = JSON.stringify(carpeta);
    console.log(caroetaJson);
    return res.status(201).json(carpeta);
};

module.exports = {
  listarCarpetas, 
  actualizarCarpetas,
  crearCarpeta,
  deletedCarpeta,
  obtnenerCarpeta,
  listarCarpetasBorradas
};
