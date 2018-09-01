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
  idCategoria = 1;
  totalInscritos = 0;
  constructor(
    public api: RestService, 
    public loadingController: LoadingController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.getAtletasLibreMasculino();
  }
  public printReport(){
    this.api.makePdf(this.LibreMasculino,'LM');
  }
  async getAtletasLibreMasculino() {
    const loading = await this.loadingController.create({
      content: 'Libre Masculino'
    });
    await loading.present();
    await this.api.getAtletasCategoria(this.idCategoria)
      .subscribe(res => {
        this.LibreMasculino = res.atletas;
        this.totalInscritos = this.LibreMasculino.length;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
}
