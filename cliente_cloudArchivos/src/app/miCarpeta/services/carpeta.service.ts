import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Carpeta from '../interfaces/carpeta.interface';
@Injectable({
  providedIn: 'root'
})
export class CarpetaService {
  private baseUrl = 'http://localhost:4001';
  constructor(private http: HttpClient) { }

  listarCarpetas(raiz: string, creador:string) {
    console.log(`${this.baseUrl}/api/listar-carpeta/${raiz}/${creador}`)
    return this.http.get(`${this.baseUrl}/api/listar-carpeta/${raiz}/${creador}` );
  }

  listarCarpetasEliminadas( creador:string) {
    console.log("servie excute")
    console.log(`${this.baseUrl}/api/listar-carpeta-eliminadas/${creador}`)
    return this.http.get(`${this.baseUrl}/api/listar-carpeta-eliminadas/${creador}` );
  }

  obtenerCarpeta(raiz: string, creador:string) {
    console.log(`${this.baseUrl}/api/obtener-carpeta/${raiz}/${creador}`)
    return this.http.get(`${this.baseUrl}/api/obtener-carpeta/${raiz}/${creador}` );
  }

  crearCarpeta(carpeta: Carpeta) {
    return this.http.post(`${this.baseUrl}/api/crear-carpeta`, carpeta);
  }

  updateCarpetaMover( creador:string, doc: Carpeta , raizActual: string){
    return this.http.put(`${this.baseUrl}/api/update-carpeta/${doc.nombre}/${creador}/${raizActual}`, doc );
  }

  deleteCarpeta(doc: Carpeta) {
    return this.http.delete(`${this.baseUrl}/api/delete-carpeta/${doc.nombre}/${doc.creador}/${doc.raiz}`);
  }
  deleteCarpetaParams(raiz: string, creador:string,nombre:string ) {
    return this.http.delete(`${this.baseUrl}/api/delete-carpeta/${nombre}/${creador}/${raiz}`);
  }
}
