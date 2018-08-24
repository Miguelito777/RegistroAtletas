import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AtletasInscroitosPage } from './atletas-inscroitos.page';

const routes: Routes = [
  {
    path: '',
    component: AtletasInscroitosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AtletasInscroitosPage]
})
export class AtletasInscroitosPageModule {}
