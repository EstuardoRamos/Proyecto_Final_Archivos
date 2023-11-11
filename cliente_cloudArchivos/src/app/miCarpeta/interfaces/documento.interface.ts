interface Documento {
    nombre: string;
    tipo: string;
    raiz: string;
    contenido: string;
    creador: String;
    deleted: boolean;
    compartido?:string;
     // El campo 'raiz' es opcional
  }

  interface Compartido {
    nombre: string;
    tipo: string;
    raiz: string;
    contenido: string;
    creador: String;
    deleted: boolean;
    compartido:string;
     // El campo 'raiz' es opcional
  }
  
  export default Documento;