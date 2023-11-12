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
  carpetaActual:Carpeta;
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
      //console.log("acpeta raiz")
      
      this.raiz=this.globalsService.getUser().username;
    }
    //this.carpeta.raiz =this.raiz
    this.listarDocs(this.raiz, this.globalsService.getUser().username);
    this.listarCarpetas(this.raiz, this.globalsService.getUser().username);
  }
  regresar(){
    /*console.log(" Carpeta actual "+this.carpeta.nombre)
    console.log("Regresando a "+this.carpeta.raiz)
    console.log("Raiz actual "+this.raiz)
    this.raiz=this.carpeta.raiz;
    if(this.raiz===this.carpeta.nombre){
       this.raiz=this.globalsService.getUser().username;
    }else{
      
    }
    
    this.listarDocs(this.raiz, this.globalsService.getUser().username);
    this.listarCarpetas(this.raiz, this.globalsService.getUser().username);
    this.carpeta=this.carpetaAnterior;
    console.log("Carpeta actual "+this.carpeta.raiz)*/
    if (this.carpeta.raiz===this.globalsService.getUser().username) {
      this.listarCarpetas(this.carpeta.raiz,this.globalsService.getUser().username );
      this.listarDocs(this.carpeta.raiz,this.globalsService.getUser().username );
      
    }else{
      this.obtnenerPadre(this.carpeta.raiz);
    }
    
    
  }

  
  abrirDialogo() {
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
      this.router.navigate([this.globalsService.getTipoUser() ]);
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
    const ruta: string=this.globalsService.getTipoUser()+'/edit'
    this.router.navigate([ruta,{ document: JSON.stringify(document), edit:false, raiz }]);
  }

  listarDocs (raiz: string, creador:string){
    if (!raiz || !creador) {
      // Realiza alguna validación de los campos de inicio de sesión
      return;
    }

    this._documentoService.listarDoc1(raiz, creador).subscribe({
      next: (response: Object) => {
        this.documentos = response as Documento[];
        this.documentos.forEach(element => {
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

  listarCarpetas (raiz: string, creador:string){
    if (!raiz || !creador) {
      // Realiza alguna validación de los campos de inicio de sesión
      return;
    }

    this._carpetaService.listarCarpetas(raiz, creador).subscribe({
      next: (response: Object) => {
        this.carpetas = response as Carpeta[];
        this.carpetas.forEach(element => {
          //console.log(element.nombre, element.raiz);
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
    const ruta: string=this.globalsService.getTipoUser()+'/mi-carpeta'
    this.router.navigateByUrl(ruta, { skipLocationChange: true }).then(() => {
      this.router.navigate([ruta]);
    });
  }
  obtnenerPadre(nombre: string){
    this._carpetaService.obtenerCarpeta(nombre, this.globalsService.getUser().username)
    .subscribe({
      next: (response: any) =>{
        this.carpetaActual=response as Carpeta;
        console.log("Obtenemos la carpeta")
        console.log(this.carpetaActual);
        console.log("obtubimoos qui"+this.carpetaActual.nombre);
        this.listarDocs(this.carpetaActual.nombre, this.globalsService.getUser().username);
        this.listarCarpetas(this.carpetaActual.nombre , this.globalsService.getUser().username);
        this.carpeta=this.carpetaActual;
        console.log("hacemos el cambie de "+this.carpeta.nombre+" a  "+this.carpetaActual.nombre );
      }
    })

    
  }

}


