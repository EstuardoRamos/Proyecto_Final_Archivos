//import { Component } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import Carpeta from '../../interfaces/carpeta.interface';
import { GlobalsService } from 'src/app/globals/globals.service';
import { CarpetaService } from '../../services/carpeta.service';

@Component({
  selector: 'app-dialogo-nuevo',
  templateUrl: './dialogo-nuevo.component.html',
  styleUrls: ['./dialogo-nuevo.component.css']
})
export class DialogoNuevoComponent {

  nombre:string;
  tipo: string;
  
  constructor(
    private globalsService: GlobalsService,
    private _carpetaService: CarpetaService,
    public dialogRef: MatDialogRef<DialogoNuevoComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: { carpeta: string }) {}

  ngOnInit() {
    console.log("recibimos ", this.data.carpeta)
  }

  cancelar() {
    this.dialogRef.close();
  }
  crear(){
    let creador: string=this.globalsService.getUser().username;
    console.log(creador);
    const carpeta: Carpeta = {
      nombre: this.nombre,
      creador: creador,
      raiz: this.data.carpeta,
      deleted: false
    };
    this._carpetaService.crearCarpeta(carpeta)
      .subscribe(
        response => {
          alert('Carpeta creada');
          location.reload();
          //window.location.reload();
          // Realiza cualquier acción adicional después de registrar el usuario, como redireccionar a otra página
        },
        error => {
          console.error('Error al registrar usuario', error);
          // Maneja el error de registro de usuario, muestra un mensaje de error, etc.
        }
      );
    
    this.dialogRef.close();
  }
}
