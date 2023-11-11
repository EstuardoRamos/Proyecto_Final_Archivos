import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './autentication/login/login.component';
import { EditorComponent } from './editor_de_texto/editor/editor.component';

import { FormsModule } from '@angular/forms';
import { PrincipalComponent } from './administrador/principal/principal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from  '@angular/material/grid-list' ;
import {MatTableModule} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTreeModule} from '@angular/material/tree';


//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NgxEditorModule } from 'ngx-editor';
import { BarraComponent } from './barra/barra.component';
import { RegistroComponent } from './autentication/registro/registro.component';
import { from } from 'rxjs';
import { MiCarpetaComponent } from './miCarpeta/mi-carpeta/mi-carpeta.component';
import { BarraEmpleadoComponent } from './empleado/vistas/barra-empleado/barra-empleado.component';
import { HttpClientModule } from '@angular/common/http';
import { DocumentoComponent } from './miCarpeta/documento/documento/documento.component';
import { DialogoNuevoComponent } from './miCarpeta/dialogo/dialogo-nuevo/dialogo-nuevo.component';
import { CarpetaComponent } from './miCarpeta/carpeta/carpeta/carpeta.component';
import { TreeFlatOverviewExampleComponent } from './tree-prueba/tree-flat-overview-example/tree-flat-overview-example.component';
import { TreeFlatOverviewExample } from './tree-prueba/TreeFlatOverviewExample ';
import { SelectCarpetaComponent } from './miCarpeta/dialogo/select-carpeta/select-carpeta.component';
import { ListadoCompartidosComponent } from './compartido/listado-compartidos/listado-compartidos.component';
import { ListadoUsersComponent } from './compartido/listado-users/listado-users.component';
import { VisorComponent } from './compartido/visor/visor.component';
import { DialogoCompartirComponent } from './miCarpeta/dialogo/dialogo-compartir/dialogo-compartir.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EditorComponent,
    PrincipalComponent,
    BarraComponent, 
    RegistroComponent,
    MiCarpetaComponent,
    BarraEmpleadoComponent,
    DocumentoComponent,
    CarpetaComponent,
    DialogoNuevoComponent,
    TreeFlatOverviewExampleComponent,
    TreeFlatOverviewExample,
    SelectCarpetaComponent,
    ListadoCompartidosComponent,
    ListadoUsersComponent,
    VisorComponent,
    DialogoCompartirComponent
  ],
  imports: [
    FormsModule,
    NgxEditorModule,

    HttpClientModule,

    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatTreeModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
