const Document = require("../models/document.model");

async function crearDocumento(documentData) {
  try {
    // Aquí puedes agregar lógica para validar los datos del documento
    const document = new Document(documentData);
    return await document.save();
  } catch (error) {
    throw new Error("Error al crear el documento");
  }
}

async function listarDocumentos(raiz, creador) {
  try {
    return await Document.find({ raiz, creador });
  } catch (error) {
    throw  Error("Error al listar documentos");
  }
}

async function actualizarDocumento(nombreDocumento, updateData) {
  try {
    return await Document.findOneAndUpdate(
      { nombre: nombreDocumento },
      updateData,
      { new: true }
    );
  } catch (error) {
    throw new Error("Error al actualizar el documento");
  }
}

async function borrarDocumento(nombreDocumento, creador) {
  try {
    return await Document.findOneAndDelete({ nombre: nombreDocumento, creador });
  } catch (error) {
    throw new Error("Error al borrar el documento");
  }
}

module.exports = {
  crearDocumento,
  listarDocumentos,
  actualizarDocumento,
  borrarDocumento,
};
