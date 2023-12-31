import { Component } from '@angular/core';
import { GlobalsService } from 'src/app/globals/globals.service';
import Documento from 'src/app/miCarpeta/interfaces/documento.interface';
import { DocumentoService } from 'src/app/miCarpeta/services/documents.servise';
import { Editor } from 'ngx-editor';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-compartidos',
  templateUrl: './listado-compartidos.component.html',
  styleUrls: ['./listado-compartidos.component.css']
})
export class ListadoCompartidosComponent {
  editor!: Editor;
  html: string;
  documentos: Documento[]= [];
  docs: string[]= ["doc1.txt ", "doc2.txt"]
  
  constructor(
    private _documentoService: DocumentoService,
    private globalService: GlobalsService,
    private router: Router,
    private documentoService: DocumentoService 
  ){}
  

  ngOnInit() {
    this.editor = new Editor();
    this.listarCompartidos();
  }

  listarCompartidos(){
    console.log("nada");
    console.log(this.globalService.getUser().username);
    

    this._documentoService.listarDocsCompartidos(this.globalService.getUser().username).subscribe({
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

  Ver(doc: Documento){
    console.log(doc.nombre)
    const ruta: string=this.globalService.getTipoUser()+'/visor'
    this.router.navigate([ruta, { doc: JSON.stringify(doc)}]);
  }

  

// ...

eliminar(document: Documento) {
  Swal.fire({
    icon: 'warning',
    title: `¿Está seguro que desea eliminar ${document.nombre}?`,
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      this.documentoService.deleteDocCompartido(document)
        .subscribe(
          (data) => {
            Swal.fire({
              icon: 'success',
              title: 'Documento eliminado',
              text: 'Se ha eliminado el documento exitosamente.',
            });
            location.reload();
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: 'No se pudo eliminar el documento.',
            });
          }
        );
    }
  });
}


}
