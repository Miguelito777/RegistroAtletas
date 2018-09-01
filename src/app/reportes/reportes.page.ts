import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  public categorias: any;
  public reportes: any;

  constructor(
    public api: RestService,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) { 
    this.getReportes();
  }

  ngOnInit() {
  }
  async getReportes() {
    const loading = await this.loadingController.create({
      content: 'Reportes'
    });
    await loading.present();
    await this.api.getReporte()
      .subscribe(res => {
        this.reportes = res.Atletas;
        console.log(this.reportes);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
}
