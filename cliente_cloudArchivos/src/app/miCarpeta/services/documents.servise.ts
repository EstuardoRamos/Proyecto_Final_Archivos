import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Documento from '../interfaces/documento.interface';


@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  private baseUrl = 'http://localhost:4001';

  constructor(private http: HttpClient) { }

  crearDoc(documento: Documento) {
    return this.http.post(`${this.baseUrl}/api/crearDoc`, documento);
  }

  listarDoc(documento: Documento) {
    return this.http.get(`${this.baseUrl}/api/listarDoc/${documento.raiz}/${documento.creador}` );
  }
  listarDoc1(raiz: string, creador:string) {
    return this.http.get(`${this.baseUrl}/api/listarDoc/${raiz}/${creador}` );
  }
  listarDocsCompartidos(creador:string) {
    return this.http.get(`${this.baseUrl}/api/listar-compartido/${creador}` );
  }

  listarDocsEliminados(creador:string) {
    return this.http.get(`${this.baseUrl}/api/listarDoc-eliminados/${creador}` );
  }


  updateDocument( creador:string, doc: Documento ){
    return this.http.put(`${this.baseUrl}/api/updateDoc/${doc.nombre}/${creador}/${doc.raiz}`, doc );
  }

  updateDocumentMover( creador:string, doc: Documento , raizActual: string){
    return this.http.put(`${this.baseUrl}/api/updateDoc/${doc.nombre}/${creador}/${raizActual}`, doc );
  }

  deleteDoc(doc: Documento) {
    return this.http.delete(`${this.baseUrl}/api/del/${doc.nombre}/${doc.creador}/${doc.raiz}`);
  }
  deleteDocsCarpeta(raiz: string, creador: string) {
    return this.http.delete(`${this.baseUrl}/api/del-docs-carpeta/${creador}/${raiz}`);
  }

  deleteDocCompartido(doc: Documento) {  
    console.log("compartido a eliminar "+doc.nombre);
    return this.http.delete(`${this.baseUrl}/api/del-compartido/${doc.nombre}/${doc.compartido}`);
  }

  compartiDoc(compartido: Documento) {
    return this.http.post(`${this.baseUrl}/api/compartir`, compartido);
  }
}