import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LibreFemeninoPage } from './libre-femenino.page';

const routes: Routes = [
  {
    path: '',
    component: LibreFemeninoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LibreFemeninoPage]
})
export class LibreFemeninoPageModule {}
