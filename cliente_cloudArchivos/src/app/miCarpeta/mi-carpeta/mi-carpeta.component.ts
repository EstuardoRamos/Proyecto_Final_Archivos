import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../services/documents.servise';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogoNuevoComponent } from '../dialogo/dialogo-nuevo/dialogo-nuevo.component';
import Documento from 'src/app/miCarpeta/interfaces/documento.interface';
import Carpeta from '../interfaces/carpeta.interface';
import { CarpetaService } from '../services/carpeta.service';
import { GlobalsService } from '../../globals/globals.service';
import { SelectCarpetaComponent } from '../dialogo/select-carpeta/select-carpeta.component';
import { DialogoCompartirComponent } from '../dialogo/dialogo-compartir/dialogo-compartir.component';

@Component({
  selector: 'app-mi-carpeta',
  templateUrl: './mi-carpeta.component.html',
  styleUrls: ['./mi-carpeta.component.css']
})


export class MiCarpetaComponent {
  documento!: Documento;
  documentoTmp: Documento;
  documentos: Documento[]=[];
  carpetas: Carpeta[];
  carpeta:Carpeta;
  carpetaTmp:Carpeta;
  carpetaAnterior:Carpeta;
  raiz:string; 
  creador:string;
  portapales:boolean=false;
  portapalesC:boolean=false;
  
  

   nuevoDocumento: Documento = {
    nombre: 'MiDocumento',
    tipo: '.txt',
    raiz: "usuario1",
    contenido: 'Este es el contenido del documento. 12',
    creador: "usuario1",
    deleted: false,
  };
  

  constructor(
    private _documentoService: DocumentoService,
    private _carpetaService: CarpetaService,
    private globalsService: GlobalsService,
    private router: Router,
    public dialog: MatDialog
    
  ) {
    
  }
  onDoubleClick(carpeta: Carpeta){
    this.carpetaAnterior=this.carpeta;
    this.carpeta=carpeta;
    this.iniciar();
  }
  mover(portapales: Documento){
    this.portapales=true;
    this.documentoTmp={...portapales};
  }

  moverCarpeta(portapales: Carpeta){
    this.portapalesC=true;
    this.carpetaTmp={...portapales};
  }

  pegar(){
    let raizActual=this.documentoTmp.raiz;
    this.documentoTmp.raiz=this.carpeta.nombre;
    this._documentoService
        .updateDocumentMover(this.globalsService.getUser().username, this.documentoTmp, raizActual)
        .subscribe(
          (response) => {
            alert('Se ha movido el documento correctamente');
            this.portapales=false;
            this.onDoubleClick(this.carpeta);
           // window.location.reload();
          },
          (error) => {}
        );
  }
  pegarCarpeta(){
    let raizActual=this.carpetaTmp.raiz;
    this.carpetaTmp.raiz=this.carpeta.nombre;
    this._carpetaService
        .updateCarpetaMover(this.globalsService.getUser().username, this.carpetaTmp, raizActual)
        .subscribe(
          (response) => {
            alert('Se ha movido el documento correctamente');
            this.portapalesC=false;
            this.onDoubleClick(this.carpeta);
           // window.location.reload();
          },
          (error) => {}
        );
  }
  ngOnInit() {
    this.iniciar();
  }
  iniciar(){
    if(this.carpeta){
      this.raiz=this.carpeta.nombre
      
    }else{
      console.log("acpeta raiz")
      
      this.raiz=this.globalsService.getUser().username;
    }
    //this.carpeta.raiz =this.raiz
    this.listarDocs(this.raiz, this.globalsService.getUser().username);
    this.listarCarpetas(this.raiz, this.globalsService.getUser().username);
  }
  regresar(carpeta: Carpeta){
    this.raiz=carpeta.raiz;
    this.listarDocs(this.raiz, this.globalsService.getUser().username);
    this.listarCarpetas(this.raiz, this.globalsService.getUser().username);
    this.carpeta=this.carpetaAnterior
  }

  
  abrirDialogo() {
    //console.log("Estamos en lal carpeta: "+this.carpeta.nombre)
    let raiz;
    if(this.carpeta){
      raiz= this.carpeta.nombre;
    }else{
      //aqui debo obtener el username
      raiz=this.globalsService.getUser().username;
    }
    
    const dialogo1 = this.dialog.open(DialogoNuevoComponent, {
      data: {
        carpeta: raiz
      }
      
    });

    dialogo1.afterClosed().subscribe(art => {
      this.router.navigate(['/empleado']);
    });
  }
  abrirDialogoC() {
    const dialogo = this.dialog.open(SelectCarpetaComponent, {
      data: {
        //documento: this.documento,
        carpeta: this.carpeta
      }
      
    });

    dialogo.afterClosed().subscribe(art => {
      this.router.navigate(['/empleado']);
    });
  }

  

  crearNuevoDoc(){
    let document:Documento= this.nuevoDocumento;
    let raiz;
    if(this.carpeta){
      raiz= this.carpeta.nombre;
    }else{
      //aqui debo obtener el username
      raiz=this.globalsService.getUser().username;
    }
    this.router.navigate(['/empleado/edit/',{ document: JSON.stringify(document), edit:false, raiz }]);
  }

  listarDocs (raiz: string, creador:string){
    console.log("nada");
    if (!raiz || !creador) {
      // Realiza alguna validación de los campos de inicio de sesión
      return;
    }

    this._documentoService.listarDoc1(raiz, creador).subscribe({
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

  listarCarpetas (raiz: string, creador:string){
    console.log("nada");
    if (!raiz || !creador) {
      // Realiza alguna validación de los campos de inicio de sesión
      return;
    }

    this._carpetaService.listarCarpetas(raiz, creador).subscribe({
      next: (response: Object) => {
        this.carpetas = response as Carpeta[];
        this.carpetas.forEach(element => {
          console.log(element.nombre, element.raiz);
          this.carpetaAnterior=element;
        });   
        
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        alert(error.error);
        // Maneja el error de inicio de sesión, muestra un mensaje de error, etc.
      },
    });
  }

  refreshPage() {
    this.router.navigateByUrl('/empleado/mi-carpeta', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/empleado/mi-carpeta']);
    });
  }


}


