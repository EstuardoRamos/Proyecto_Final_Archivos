import { Injectable } from '@angular/core';
import User  from 'src/app/autentication/user/user.interface';
import Carpeta from '../miCarpeta/interfaces/carpeta.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalsService {
  private baseUrl = 'http://localhost:3001/';

  getBaseUrl() {
    return this.baseUrl;
  }

  addUser(username: string) {
    localStorage.setItem('tmpUser', JSON.stringify({ username }));
  }

  getUser() {
    const user =
      localStorage.getItem('actualUser') ||
      localStorage.getItem('tmpUser') ||
      '{}';
    return JSON.parse(user) as User;
  }

  getTipoUser():string {
    const tipo =
      localStorage.getItem('tipoUser')
    return tipo as string;
  }

  addCarpetaActual(tmpCarpeta: Carpeta) {
    localStorage.setItem('tmpCarpeta', JSON.stringify({ tmpCarpeta }));
  }
  getCarpetaActual() {
    const carpeta =
      localStorage.getItem('tmpCarpeta') ||
      '{}';
    return JSON.parse(carpeta) as Carpeta;
  }
  deleteTmpCarpeta() {
    localStorage.removeItem('tmpCarpeta');
  }

  deleteUser() {
    localStorage.removeItem('actualUser');
  }
}