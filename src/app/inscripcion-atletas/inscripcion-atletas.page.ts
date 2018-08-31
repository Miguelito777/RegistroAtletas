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
  public competicion: any;
  public atleta : any;
  public currentYear = 2018;

  constructor(
    public api: RestService,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {
    this.getCompeticion();
    this.getCategorias();
    this.atleta = {
    };
  }

  ngOnInit() {
  }
  async getCategorias() {
    const loading = await this.loadingController.create({
      content: 'Categorias'
    });
    await loading.present();
    await this.api.getCategorias()
      .subscribe(res => {
        this.categorias = res;
        //console.log(this.categorias);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
  async getCompeticion() {
    const loading = await this.loadingController.create({
      content: 'Competicion'
    });
    await loading.present();
    await this.api.getCompeticion()
      .subscribe(res => {
        this.competicion = res[0];
        //console.log(this.categorias);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
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
          for(var i in this.categorias){
            if(this.categorias[0].nombre == "Libre Femenino"){
              this.atleta.id_categoria = this.categorias[0].id;
              return "Libre Femenino";
            }
          }
        }else{
          for(var i in this.categorias){
            if(this.categorias[0].nombre == "Libre Masculino"){
              this.atleta.id_categoria = this.categorias[0].id;
              return "Libre Masculino";
            }
          }
        }
      }else{
        for(var i in this.categorias){
          if(this.categorias[0].nombre == "Master Masculino"){
            this.atleta.id_categoria = this.categorias[0].id;
            return "Master Masculino";
          }
        }
      }
    }
  }

  async saveAtleta() {
    if(this.atleta.dpi == undefined || 
      this.atleta.id_categoria == undefined ||
      this.atleta.numero == undefined ||
      this.atleta.dpi == '' || 
      this.atleta.id_categoria == '' ||
      this.atleta.numero == '' ||
      this.atleta.dpi == null ||
      this.atleta.id_categoria == null ||
      this.atleta.numero == null){
        const toast = await this.toastController.create({
          message: 'Llenar todos los campos',
          duration: 2000,
          position : 'middle' 
        });
        toast.present();
    }else{
      this.atleta.id_competicion = this.competicion.id;
      this.atleta.fecha_nacimiento = new Date(this.atleta.fechaNacimiento.year.value, this.atleta.fechaNacimiento.month.value, this.atleta.fechaNacimiento.day.value);
      this.saveNewAtleta();
      /*const loading = await this.loadingController.create({
        content: 'Almacenando Atleta'
      });
      await loading.present();
  
      let hideFooterTimeout = setTimeout(() => {
        this.otrafunction(loading);
      }, 2000);*/
    }
  }
  async saveNewAtleta(){
    console.log(this.atleta);
    let token = this.getToken();
    await this.api.postAtleta(this.atleta,token)
    .subscribe(res => {
        console.log(res);
        /*let id = res['id'];
        this.router.navigate(['/detail/'+id]);*/
      }, (err) => {
        console.log(err);
      });
  }
  getToken() {
    let token = document.querySelector('meta[property="csrf-token"]')
    ['content'];
     return token;
   }
}
