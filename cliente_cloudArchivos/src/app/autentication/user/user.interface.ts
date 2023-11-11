interface User {
    name: string;
    username: string;
    password: string;
    admin: boolean;
    deleted: boolean;
    raiz?: string; // El campo 'raiz' es opcional
  }
  
  export default User;
  