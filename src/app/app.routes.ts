import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './index/index.component';
import { RegistroComponent } from './registro/registro.component';
import { PanelComponent } from './panel/panel.component';
import { TestpageComponent } from './testpage/testpage.component';
import { PaneladministracionComponent } from './paneladministracion/paneladministracion.component';
import { ServicioComponent } from './servicio/servicio.component';
import { ContactoComponent } from './contacto/contacto.component';
import { authGuard } from './auth.guard';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';

export const routes: Routes = [ 
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent },
  { path: 'registro', component: RegistroComponent },
  {path: 'servicio', component:ServicioComponent},
  { path: 'contacto', component: ContactoComponent },
  { path: 'trabajadores', component: TrabajadoresComponent },
  { path: 'panel', component: PanelComponent, canActivate: [authGuard] },
  { path: 'testpage', component: TestpageComponent },
  { path: 'paneladministracion', component: PaneladministracionComponent },
  { path: '**', redirectTo: 'index' }
];