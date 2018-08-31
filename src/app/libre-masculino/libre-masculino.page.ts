import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-libre-masculino',
  templateUrl: './libre-masculino.page.html',
  styleUrls: ['./libre-masculino.page.scss'],
})
export class LibreMasculinoPage implements OnInit {
  LibreMasculino : Array<Object> = [];
  constructor(
    public api: RestService, 
    public loadingController: LoadingController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.getAtletasLibreMasculino();
  }

  async getAtletasLibreMasculino() {
    const loading = await this.loadingController.create({
      content: 'Libre Masculino'
    });
    await loading.present();
    await this.api.getAtletas()
      .subscribe(res => {
        console.log(res);
        this.LibreMasculino = res.atletas;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
}
