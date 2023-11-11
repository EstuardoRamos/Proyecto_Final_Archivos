import Documento from "./documento.interface";

interface Carpeta {
    nombre: string;
    raiz: string;
    creador: string;
    deleted: boolean;
    carpetas?: Carpeta[],
    documentos?: Documento[]
     // El campo 'raiz' es opcional
  }
  
  export default Carpeta;