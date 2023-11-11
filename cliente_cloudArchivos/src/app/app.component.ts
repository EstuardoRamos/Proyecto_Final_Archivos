import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cliente_cloudArchivos';
  icon: string ="folder";
  messages: string[] = ["Manzana", "Banana", "Cereza", "Damasco"];

  
}
