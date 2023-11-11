import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';
import Documento from 'src/app/miCarpeta/interfaces/documento.interface';


@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.css']
})
export class VisorComponent {
  editor: Editor;
  html = '';
  documento: Documento;
  titulo:string;

  constructor(
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.editor = new Editor();
    this.route.params.subscribe((params) => {
      const documento: Documento = JSON.parse(params['doc']);
      this.documento = documento;
      this.titulo=this.documento.nombre;
      this.html = documento.contenido;
    });
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  regresar(){
    window.history.back()
  }

}
