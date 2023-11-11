import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './autentication/login/login.component';
import { BarraComponent } from './barra/barra.component';
import { MiCarpetaComponent } from './miCarpeta/mi-carpeta/mi-carpeta.component';
import { EditorComponent } from './editor_de_texto/editor/editor.component';
import { BarraEmpleadoComponent } from './empleado/vistas/barra-empleado/barra-empleado.component';
import { PrincipalComponent } from './administrador/principal/principal.component';
import { TreeFlatOverviewExample } from './tree-prueba/TreeFlatOverviewExample ';
import { ListadoCompartidosComponent } from './compartido/listado-compartidos/listado-compartidos.component';
import { VisorComponent } from './compartido/visor/visor.component';
import { RegistroComponent } from './autentication/registro/registro.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tree', component: TreeFlatOverviewExample },
  { path: 'regis', component: RegistroComponent },
  {
    path: 'empleado',
        component: BarraEmpleadoComponent,
        children: [
          { path: '', component: MiCarpetaComponent },
          { path: 'edit', component: EditorComponent },
          { path: 'mi-carpeta', component: MiCarpetaComponent },
          { path: 'login', component: LoginComponent },
          { path: 'compartidos', component: ListadoCompartidosComponent},
          { path: 'visor', component: VisorComponent},
        ],
  },
  {
    path: 'admin',
        component: PrincipalComponent,
        children: [
          { path: '', component: PrincipalComponent },
          { path: 'edit', component: EditorComponent },
          { path: 'mi-carpeta', component: MiCarpetaComponent },
        ],
  },
  { path: '**', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
