import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-master-masculino',
  templateUrl: './master-masculino.page.html',
  styleUrls: ['./master-masculino.page.scss'],
})
export class MasterMasculinoPage implements OnInit {
  MasterMasculino : Array<Object> = [];
  idCategoria = 3;
  totalInscritos = 0;

  constructor(
    public api: RestService, 
    public loadingController: LoadingController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.getAtletasMasterMasculino();
  }
  public printReport(){
    this.api.makePdf(this.MasterMasculino,'MM');
  }
  async getAtletasMasterMasculino() {
    const loading = await this.loadingController.create({
      content: 'Master Masculino'
    });
    await loading.present();
    await this.api.getAtletasCategoria(this.idCategoria)
      .subscribe(res => {
        console.log(res);
        this.MasterMasculino = res.atletas;
        this.totalInscritos = this.MasterMasculino.length;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
}
