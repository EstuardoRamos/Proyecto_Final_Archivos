import { Component } from '@angular/core';
import User from '../user/user.interface';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username?: string;
  password?: string;
  user: User | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  // ...
  
  login() {
    console.log("nada");
    if (!this.username || !this.password) {
      // Muestra una alerta con SweetAlert2 para indicar campos vacíos
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'Por favor, completa todos los campos.',
      });
      return;
    }
  
    this.authService.login(this.username, this.password).subscribe({
      next: (response: Object) => {
        this.user = response as User;
        console.log('Inicio de sesión exitoso', this.user);
  
        const message = `Bienvenido, ${this.user.name} (${this.user.username})`;
  
        // Utiliza SweetAlert2 para mostrar un mensaje de bienvenida
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: message,
        });
  
        this.user.password = '';
        localStorage.setItem('actualUser', JSON.stringify(this.user));
  
        if (this.user.admin) {
          this.router.navigate(['/admin']);
          localStorage.setItem('tipoUser', '/admin');
        } else {
          this.router.navigate(['/empleado']);
          localStorage.setItem('tipoUser', '/empleado');
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
  
        // Utiliza SweetAlert2 para mostrar un mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: error.error.error || 'Ha ocurrido un error inesperado.',
        });
      },
    });
  }
  

}
