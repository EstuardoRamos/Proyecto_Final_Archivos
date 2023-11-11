const { error } = require("console");
const Document = require("../models/document.model")

const bcrypt = require("bcrypt");
/**
 * @param {Request} req
 * @param {Response} res
 */
const crearDocument = (req, res) => {
    let parametros = req.body;
    const document = new Document(parametros);
  
    Document.find({
      $or: [{ nombre: document.nombre.toLowerCase() }],
    })
      .exec() // Agrega .exec() para ejecutar la consulta
      .then((documents) => {
        if (documents && documents.length >= 1) {
          return res.status(200).json({
            status: "success",
            msg: "Ya hay otro archivo con el nombre",
          });
        } else {
          // Guarda el usuario y devuelve una respuesta
          return document
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


const listarDocs = async (req, res) => {
  const raiz = req.params.raiz; 
  const creador = req.params.creador;
  const deleted= false;
  const document = await Document.find({ raiz, creador, deleted });

  if (!document) {
    throw new Error("El Archivo no existente");
  }
  console.log("correcto-------")
    const documentJson = JSON.stringify(document);
    console.log(documentJson);
    return res.status(201).json(document);
};


const actualizarDoc = async (req, res) => {
  const nombreDoc = req.params.nombre; 
  const creadorDoc = req.params.creador;
  const raizDoc = req.params.raiz; 
  const updateData = req.body;

  try {
    const document = await Document.findOneAndUpdate(
      { nombre: nombreDoc, creador: creadorDoc, raiz: raizDoc}, // Debes especificar el campo _id
      updateData,
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

const deletedDoc = async (req, res) => {
  const nombre = req.params.nombre; 
  const creador = req.params.creador;
  const raiz = req.params.raiz;
  const updateData = req.body;

  try {
    const document = await Document.findOneAndUpdate(
      { nombre, creador, raiz},
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

const deletedDocCarpeta = async (req, res) => {
  const creador = req.params.creador;
  const raiz = req.params.raiz;

  try {
    const result = await Document.updateMany(
      { creador, raiz },
      { $set: { deleted: true } }
    );

    if (result.n === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Documentos no encontrados',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Documentos actualizados correctamente',
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
  actualizarDoc,
  crearDocument,
  deletedDoc,
  deletedDocCarpeta
};
