import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-libre-masculino',
  templateUrl: './libre-masculino.page.html',
  styleUrls: ['./libre-masculino.page.scss'],
})
export class LibreMasculinoPage implements OnInit {
  LibreMasculino: any;
  constructor(
    public api: RestService, 
    public loadingController: LoadingController
  ) { }

  ngOnInit() {

  }

  async getClassrooms() {
    const loading = await this.loadingController.create({
      content: 'Loading'
    });
    await loading.present();
    await this.api.getClassroom()
      .subscribe(res => {
        console.log(res);
        this.LibreMasculino = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

}
