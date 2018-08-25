import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-inscripcion-atletas',
  templateUrl: './inscripcion-atletas.page.html',
  styleUrls: ['./inscripcion-atletas.page.scss'],
})
export class InscripcionAtletasPage implements OnInit {
  public categorias: any;
  constructor(
    public api: RestService,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {
    //this.getCategorias();
  }

  ngOnInit() {
  }
  async getCategorias() {
    const loading = await this.loadingController.create({
      content: 'Loading'
    });
    await loading.present();
    await this.api.getCategorias()
      .subscribe(res => {
        this.categorias = res;
        console.log(this.categorias);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
  async saveAtleta() {
    const loading = await this.loadingController.create({
      content: 'Loading'
    });
    await loading.present();

    let hideFooterTimeout = setTimeout(() => {
      this.otrafunction(loading);
    }, 2000);
  }
  async otrafunction(loading){
    const toast = await this.toastController.create({
      message: 'Atleta Almacenado Exitosamente',
      duration: 2000,
      position : 'middle' 
    });
    loading.dismiss();
    toast.present();
  }
}
