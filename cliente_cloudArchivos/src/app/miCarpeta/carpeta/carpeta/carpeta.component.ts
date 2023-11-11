import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import Carpeta from '../../interfaces/carpeta.interface';
import { GlobalsService } from 'src/app/globals/globals.service';
import { CarpetaService } from '../../services/carpeta.service';
import { DocumentoService } from '../../services/documents.servise';

@Component({
  selector: 'app-carpeta',
  templateUrl: './carpeta.component.html',
  styleUrls: ['./carpeta.component.css']
})
export class CarpetaComponent {
  @Input() carpeta: Carpeta;
  @Input() carpetas:Carpeta[];

  @Output() carpetaActual = new EventEmitter<Carpeta>();
  @Output() carpetaMover = new EventEmitter<Carpeta>();
  

  constructor(
    private globalService: GlobalsService,
    private router: Router,
    private _carpetasServices: CarpetaService,
    private _documentoServices: DocumentoService,
    ) {}

  onDoubleClick(carpeta: Carpeta){
    console.log("Carpeta name prueba")
    console.log(carpeta.nombre)
   // this.globalService.addCarpetaActual(carpeta);
    //console.log("---Carpeta name prueba",this.globalService.getCarpetaActual().nombre )
    this.carpetaActual.emit(carpeta);

  }

  


  listarCarpetasYSub (carpeta: Carpeta){
    
    if (!carpeta.raiz || !carpeta.creador) {
      console.log("validamos");
      // Realiza alguna validación de los campos de inicio de sesión
      return;
    }
    console.log("Carpeta a listar "+carpeta.nombre, carpeta.creador);
    this._carpetasServices.listarCarpetas(carpeta.nombre, carpeta.creador).subscribe({
      next: (response: Object) => {
        this.carpetas = response as Carpeta[];
        this.carpetas.forEach(element => {
          console.log("Listamos : "+element.nombre);
          this.listarCarpetasYSub(element);
          
          //this.deletedCarpeta(element);
        });   
        this.deletedCarpeta(carpeta);
        
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        alert(error.error);
        // Maneja el error de inicio de sesión, muestra un mensaje de error, etc.
      },
    });
  }

  deletedCarpeta(carpeta: Carpeta){
    this.deleteDocInternos(carpeta.nombre, carpeta.creador);
    this._carpetasServices.deleteCarpeta(carpeta)
    .subscribe((data)=>{
      //alert("Se ha eliminado la carpeta ");
      //location.reload();
      },error=>alert("No se pudo eliminar"));

  }

  mover(carpeta: Carpeta){
    localStorage.setItem("carTmp", JSON.stringify(carpeta))
    this.carpetaMover.emit(carpeta);
  }
  borrar(carpeta: Carpeta){
    this.listarCarpetasYSub(carpeta);
    alert("Se ha eliminado la carpeta ");
    //location.reload();
  }

  deleteDocInternos(raiz: string, creador: string){
    this._documentoServices.deleteDocsCarpeta(raiz, creador)
    .subscribe((data)=>{
          //alert("Se ha eliminado el documento");
          //location.reload();
          },error=>alert("No se pudo eliminar"));
  }

  getCreador():string{
    return this.globalService.getUser().name;
  }

}
