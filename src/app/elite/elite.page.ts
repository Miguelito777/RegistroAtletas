import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-elite',
  templateUrl: './elite.page.html',
  styleUrls: ['./elite.page.scss'],
})
export class ElitePage implements OnInit {
  
  Elite : Array<Object> = [];
  idCategoria = 1;

  constructor(
    public api: RestService, 
    public loadingController: LoadingController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.getElite();
  }
  async getElite() {
    const loading = await this.loadingController.create({
      content: 'Elite'
    });
    await loading.present();
    await this.api.getAtletas()
      .subscribe(res => {
        console.log(res);
        this.Elite = res.atletas;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
}
