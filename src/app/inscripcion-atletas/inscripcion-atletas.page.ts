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
  public atleta : any;
  public currentYear = 2018;

  constructor(
    public api: RestService,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {
    this.getCategorias();
    this.atleta = {
    };
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
    console.log(this.atleta);
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
  async getCategoria(){
    if(this.atleta.fechaNacimiento == undefined){
      
    }else{
      if(this.atleta.genero == undefined){

      }else{
        this.atleta.categoriaInscripcion = this.getCategoriaAgeGen(this.getAge(this.atleta.fechaNacimiento.year.value,this.currentYear),this.atleta.genero);        
      }
    }
    /*const toast = await this.toastController.create({
      message: 'Calculate Categoría',
      duration: 2000,
      position : 'middle' 
    });
    toast.present();*/
  }
  private getAge(init, current){
    let age = current - init;
    return age;
  }
  public verifyElite(){
    if(this.atleta.elite){
      this.atleta.categoriaInscripcion = "Elite";
    }else{
      this.getCategoria();
    }
  }
  private getCategoriaAgeGen(age,gen){
    if(this.atleta.elite){
      return "Elite";
    }else{
      if(age < 39){
        if(gen == 'F'){
          return "Libre Femenino";
        }else{
          return "Libre Masculino";
        }
      }else{
        return "Master Masculino";
      }
    }
  }
}
