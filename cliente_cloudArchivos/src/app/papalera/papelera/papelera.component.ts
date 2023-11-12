import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/app/globals/globals.service';
import Carpeta from 'src/app/miCarpeta/interfaces/carpeta.interface';
import Documento from 'src/app/miCarpeta/interfaces/documento.interface';
import { CarpetaService } from 'src/app/miCarpeta/services/carpeta.service';
import { DocumentoService } from 'src/app/miCarpeta/services/documents.servise';

@Component({
  selector: 'app-papelera',
  templateUrl: './papelera.component.html',
  styleUrls: ['./papelera.component.css']
})
export class PapeleraComponent {

  constructor (
    private _carpetaService: CarpetaService,
    private _documentService: DocumentoService,
    private _globalService: GlobalsService,
    private router: Router,
  ){}
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  documentos: Documento[];
  carpetas: Carpeta[];

  ngOnInit(){
    console.log(
      "inicia"
    )
    this.listarPapelera();
  }



  listarPapelera(){
    const creador: string=this._globalService.getUser().username
    this.listarCarpetasEliminadas(creador);
    this.listarDocEliminados(creador);

  }

  listarDocEliminados(creador: string){
    this._documentService.listarDocsEliminados(creador)
    .subscribe({
      next: (response: Object) => {
        this.documentos = response as Documento[];
        this.documentos.forEach(element => {
          console.log(element.nombre, element.raiz);
        });
        
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        alert(error.error);
        // Maneja el error de inicio de sesión, muestra un mensaje de error, etc.
      },
    });
  }

  listarCarpetasEliminadas(creador: string){
    this._carpetaService.listarCarpetasEliminadas(creador)
    .subscribe({
      next: (response: Object) => {
        this.carpetas = response as Carpeta[];
        this.carpetas.forEach(element => {
          //console.log(element.nombre, element.raiz);
        });
        
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        alert(error.error);
        // Maneja el error de inicio de sesión, muestra un mensaje de error, etc.
      },
    });

  }

  Ver(doc: Documento){
    console.log(doc.nombre)
    const ruta: string=this._globalService.getTipoUser()+'/visor'
    this.router.navigate([ruta, { doc: JSON.stringify(doc)}]);
  }

}
