import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { GlobalsService } from 'src/app/globals/globals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['./cambio-password.component.css']
})
export class CambioPasswordComponent {
  password: string;
  nuevaPassword: string;
  confirmarNuevaPassword: string;
  user: string=this.globalService.getUser().username;
  constructor(
    private authService: AuthService,
    private globalService: GlobalsService
    
  ) {}

  ngOnInit(){
    this.user=this.globalService.getUser().username;
  }

  cambiar(){
    if (this.nuevaPassword === this.confirmarNuevaPassword){
      this.authService.updatePassword(this.user, this.globalService.getUser())
      .subscribe((data) =>{
          //alert("Contraseña actualizada correctamente");
          Swal.fire('Éxito', 'Contraseña cambiada con éxito', 'success');
          }, err=>{
            console.log(err);
            //alert('Error al actualizar la contraseña');
            console.error('Error al cambiar la contraseña', err);
        });
    }
  
  }

  confirmarCambioContrasena() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de cambiar la contraseña. ¿Quieres continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar contraseña',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cambiar();
      }
    });
  }

  

}
