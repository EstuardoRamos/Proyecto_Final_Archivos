import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/autentication/auth.service';
import User from 'src/app/autentication/user/user.interface';
import Documento from 'src/app/miCarpeta/interfaces/documento.interface';
import { DocumentoService } from '../../services/documents.servise';

@Component({
  selector: 'app-dialogo-compartir',
  templateUrl: './dialogo-compartir.component.html',
  styleUrls: ['./dialogo-compartir.component.css']
})
export class DialogoCompartirComponent {
  usuarios: User[];
  documento: Documento;
  constructor(
    private authService: AuthService,
    private _documentoService: DocumentoService,
    public dialogRef: MatDialogRef<DialogoCompartirComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: { documento: Documento },
    
  ){}
  ngOnInit(){
    this.listarUsers();
    this.documento=this.data.documento;
    //this.documento.nombre=this.data.documento.nombre;
    console.log("EDoc recive "+this.data.documento.nombre)
  }

  cancelar() {
    this.dialogRef.close();
  }
  crear(){
    
    this.dialogRef.close();
  }
  compartir(usurio:User){
    console.log(this.documento );
    console.log("A ", usurio.username );
    const docC: Documento ={
      nombre : this.documento.nombre,
      tipo: this.documento.tipo,
      raiz:this.documento.raiz,
      contenido:this.documento.contenido,
      compartido: usurio.username,
      creador: this.documento.creador,
      deleted: this.documento.deleted
    }
    
    
    this._documentoService.compartiDoc(docC).
    subscribe(
      (response) => {
        alert('Se ha compartido el documento correctamente');
        this.dialogRef.close();
        //location.reload();

      },
      (error) => {
        console.error('Error al compartir doc', error);
        // Maneja el error de registro de usuario, muestra un mensaje de error, etc.
      }
    );
  }

  listarUsers(){
    this.authService.listarUsers()
    .subscribe((users) =>{
        console.log("Usuarios", users);
        if (users != null && users.length >0 ){
          this.usuarios = users;
          }else{
          alert('No hay Usuarios');
        }
      }, error=>{
        alert('Error al cargar los usuarios');
      });
  
  }

}
