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
  idCategoria = 4;
  totalInscritos = 0;

  constructor(
    public api: RestService, 
    public loadingController: LoadingController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.getElite();
  }
  public printReport(){
    this.api.makePdf(this.Elite,'Elite');
  }
  async getElite() {
    const loading = await this.loadingController.create({
      content: 'Elite'
    });
    await loading.present();
    await this.api.getAtletasCategoria(this.idCategoria)
      .subscribe(res => {
        console.log(res);
        this.Elite = res.atletas;
        this.totalInscritos = this.Elite.length;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
}
