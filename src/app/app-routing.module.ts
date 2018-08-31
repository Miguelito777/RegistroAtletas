import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'InscripcionAtletas', loadChildren: './inscripcion-atletas/inscripcion-atletas.module#InscripcionAtletasPageModule' },
  { path: 'AtletasInscroitos', loadChildren: './atletas-inscroitos/atletas-inscroitos.module#AtletasInscroitosPageModule' },
  { path: 'Reportes', loadChildren: './reportes/reportes.module#ReportesPageModule' },
  { path: 'LibreMasculino', loadChildren: './libre-masculino/libre-masculino.module#LibreMasculinoPageModule' },
  { path: 'LibreFemenino', loadChildren: './libre-femenino/libre-femenino.module#LibreFemeninoPageModule' },
  { path: 'MasterMasculino', loadChildren: './master-masculino/master-masculino.module#MasterMasculinoPageModule' },
  { path: 'Elite', loadChildren: './elite/elite.module#ElitePageModule' },
  { path: 'detail/:id', loadChildren: './detail/detail.module#DetailPageModule' },
  { path: 'edit/:id', loadChildren: './edit/edit.module#EditPageModule' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
