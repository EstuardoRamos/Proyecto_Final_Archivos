import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import { ActivatedRoute } from '@angular/router';
import Documento from 'src/app/miCarpeta/interfaces/documento.interface';
import { GlobalsService } from 'src/app/globals/globals.service';
import { DocumentoService } from 'src/app/miCarpeta/services/documents.servise';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit, OnDestroy {
  editor!: Editor;
  html: string;
  documento: Documento;
  edit: boolean = false;
  raiz: string;
  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalsService,
    private _documentService: DocumentoService
    
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();
    this.route.params.subscribe((params) => {
      const documento: Documento = JSON.parse(params['document']);
      this.edit = params['edit'];
      this.raiz = params['raiz'];
      this.documento = documento;
      this.html = documento.contenido;
    });
  }

  guardar() {
    if (this.edit) {
      //actualizamos doc
      this.documento.contenido = this.html;
      this._documentService
        .updateDocument(this.globalService.getUser().username, this.documento)
        .subscribe(
          (response) => {
             Swal.fire({
              icon: 'success',
              title: 'Documento actualizado ${documento.nombre}',
              text: 'Se ha actualizado el documento exitosamente.',
            });
            
          },
          (error) => {}
        );
      console.log('hola' + this.html);
      
    } 
  }

  crear(){
      this.documento.creador = this.globalService.getUser().username;
      this.documento.raiz = this.raiz;
      this._documentService.crearDoc(this.documento).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Documento  ${documento.nombre} creado',
            text: 'Se ha creado el documento exitosamente.',
          });
        },
        (error) => {
          console.error('Error al registrar documento', error);
          // Maneja el error de registro de usuario, muestra un mensaje de error, etc.
        }
      );
  }
  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
