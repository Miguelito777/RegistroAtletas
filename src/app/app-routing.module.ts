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
  { path: 'Reportes', loadChildren: './reportes/reportes.module#ReportesPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
