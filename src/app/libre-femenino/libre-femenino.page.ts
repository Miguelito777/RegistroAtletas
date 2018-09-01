import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-libre-femenino',
  templateUrl: './libre-femenino.page.html',
  styleUrls: ['./libre-femenino.page.scss'],
})
export class LibreFemeninoPage implements OnInit {
  LibreFemenino : Array<Object> = [];
  idCategoria = 2;
  totalInscritos = 0;
  constructor(
    public api: RestService, 
    public loadingController: LoadingController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.getAtletasLibreFemenino();
  }
  public printReport(){
    this.api.makePdf(this.LibreFemenino,'LF');
  }
  async getAtletasLibreFemenino() {
    const loading = await this.loadingController.create({
      content: 'Libre Femenino'
    });
    await loading.present();
    await this.api.getAtletasCategoria(this.idCategoria)
      .subscribe(res => {
        console.log(res);
        this.LibreFemenino = res.atletas;
        this.totalInscritos = this.LibreFemenino.length;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

}
