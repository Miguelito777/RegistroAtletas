import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InscripcionAtletasPage } from './inscripcion-atletas.page';

const routes: Routes = [
  {
    path: '',
    component: InscripcionAtletasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InscripcionAtletasPage]
})
export class InscripcionAtletasPageModule {}
