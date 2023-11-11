import { Component } from '@angular/core';
import User from '../user/user.interface';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
  login(){
    console.log("nada");
    if (!this.username || !this.password) {
      // Realiza alguna validación de los campos de inicio de sesión
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (response: Object) => {
        this.user = response as User;
        console.log('Inicio de sesión exitoso', this.user);

        const message = `Bienvenido, ${this.user.name} (${this.user.username})`;

        alert(message);
        this.user.password = '';
        localStorage.setItem('actualUser', JSON.stringify(this.user));

        if (this.user.admin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/empleado']);
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        alert(error.error);
        // Maneja el error de inicio de sesión, muestra un mensaje de error, etc.
      },
    });
  }

}
