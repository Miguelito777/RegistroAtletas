import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  atleta: any = {};
  adminPassword : any;
  constructor(
    public api: RestService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
    public toastController: ToastController
  ) { 
    this.adminPassword = 'Jesucristo7778+';
  }

  ngOnInit() {
    this.getAtleta();
  }
  async getAtleta() {
    const loading = await this.loadingController.create({
      content: 'Detalles'
    });
    await loading.present();
    await this.api.getAtletaById(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log(res);
        this.atleta = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
  async delete(id) {

    const alert = await this.alertController.create({
      header: '¿Eliminar Atleta?',
      inputs: [
        {
          name: 'passAdmin',
          type: 'password',
          placeholder: 'Contraseña de Administrador'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel')
          }
        }, {
          text: 'Ok',
          handler: data => {
            if (data.passAdmin == this.adminPassword) {
              this.AutoriceAdmin();
            } else {
              this.UnAutoriceAdmin();
            }
          }
        }
      ]
    });

    await alert.present();

    /*const loading = await this.loadingController.create({
      content: 'Eliminando'
    });
    await loading.present();
    await this.api.deleteAtleta(id)
      .subscribe(res => {
        loading.dismiss();
        //this.location.back();
      }, err => {
        console.log(err);
        loading.dismiss();
      });*/
  }

  async AutoriceAdmin(){
    const toast = await this.toastController.create({
      message: 'Contraseña admin exitosa',
      duration: 2000,
      position : 'middle' 
    });
    toast.present();
  }

  async UnAutoriceAdmin(){
    const toast = await this.toastController.create({
      message: 'Error de contraseña',
      duration: 2000,
      position : 'middle' 
    });
    toast.present();
  }

}
