const { error } = require("console");
const Compartido = require("../models/compartido.model")

const bcrypt = require("bcrypt");
/**
 * @param {Request} req
 * @param {Response} res
 */
const crearCompartido = async (req, res) => {
  let parametros = req.body;
  const compartido = new Compartido(parametros);

  try {
      const resultado = await Compartido.create(compartido);
      return res.status(200).json({
          status: "success",
          msg: "Documento compartido creado correctamente",
          compartido : resultado,
      });
  } catch (error) {
      return res.status(500).json({
          status: "error",
          msg: "Error al crear el documento compartido",
          error: error.message,
      });
  }
};




const listarDocs = async (req, res) => {
  const compartido = req.params.compartido;
  const deleted= false;
  const document = await Compartido.find({  compartido, deleted });

  if (!document) {
    throw new Error("El Archivo no existente");
  }
  console.log("correcto-------")
    const documentJson = JSON.stringify(document);
    console.log(documentJson);
    return res.status(201).json(document);
};




const deletedDoc = async (req, res) => {
  const nombre = req.params.nombre; 
  const compartido = req.params.compartido;
  //const updateData = req.body;

  try {
    const document = await Compartido.findOneAndUpdate(
      { nombre, compartido},
      { deleted:true },
      { new: true }
    );

    if (!document) {
      return res.status(404).json({
        status: 'error',
        message: 'Documento no encontrado',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Documento actualizado correctamente',
      document,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error en la conexión',
    });
  }
};


module.exports = {
  listarDocs, 
  crearCompartido,
  deletedDoc,
};
