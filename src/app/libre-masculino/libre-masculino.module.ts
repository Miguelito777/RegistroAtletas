import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LibreMasculinoPage } from './libre-masculino.page';

const routes: Routes = [
  {
    path: '',
    component: LibreMasculinoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LibreMasculinoPage]
})
export class LibreMasculinoPageModule {}
