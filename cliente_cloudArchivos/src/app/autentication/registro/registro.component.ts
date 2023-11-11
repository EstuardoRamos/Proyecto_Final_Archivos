import { Component } from '@angular/core';
import User from '../user/user.interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  newUser: User;
  name:string;
  username: string;
  password: string;
  constructor(
    private authService: AuthService
  ) {}

  registrar(user:User){
    const userNew: User ={
      name:this.name,
      username:this.username,
      password:this.password,
      admin: false,
      deleted:false
    };
    console.log(userNew);
    this.authService.signup(userNew)
    .subscribe((data)=>{
        console.log('Registrado con exito');
        }, (error)=> {
        console.log('Error al registrarse');
      });
    }

    
  

}
