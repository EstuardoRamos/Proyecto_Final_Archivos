import { Component,EventEmitter, Input, Output } from '@angular/core';
import Documento from '../../interfaces/documento.interface';
import { Router } from '@angular/router';
import { DocumentoService } from '../../services/documents.servise';
import { DialogoCompartirComponent } from '../../dialogo/dialogo-compartir/dialogo-compartir.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent {
  @Input() documento:Documento;
  @Input() documentos:Documento[];

  @Output() DocumentoActual = new EventEmitter<Documento>();
  //@Output() portapeles = new EventEmitter<Boolean>();

  constructor(
    private router: Router,
    private documentoService: DocumentoService,
    public dialog: MatDialog
    ) {}

  onDoubleClick(document: Documento){
    console.log("Documento a editar")
    console.log(document.nombre)
    this.router.navigate(['/empleado/edit',{ document: JSON.stringify(document), edit:true }]);

  }

  mover(doc: Documento){
    localStorage.setItem("docTmp", JSON.stringify(doc))
    this.DocumentoActual.emit(doc);
    
  }

  borrar(documento:Documento){
    //Remplazar con un amejor alerta
    if (confirm('¿Está seguro que desea eliminar este documento?')) {
      this.documentoService.deleteDoc(documento)
      .subscribe((data)=>{
          alert("Se ha eliminado el documento");
          location.reload();
          },error=>alert("No se pudo eliminar"));
      
    }else{
    }
  }

  share(documento: Documento){
    //Remplazar con un amejor alerta
    if (confirm('¿Está seguro que desea eliminar este documento?')) {
      this.documentoService.compartiDoc(documento)
      .subscribe((data)=>{
        alert("Se ha compartido el documento");
        location.reload();
        },error=>alert("No se pudo compartir"));
    
    }else{
    }
    }

    abrirDialogoShare(documento: Documento) {
      console.log("vamos a compartir "+documento.nombre)
      const dialogo = this.dialog.open(DialogoCompartirComponent, {
        width: '400px',
        data: {
          documento: documento,
        },
      });
  
      dialogo.afterClosed().subscribe(art => {
        this.router.navigate(['/empleado']);
        //location.reload();
      });
    }

}
