import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  AtletaForm: FormGroup;
  atle : any;
  adminPassword : any;
  atleta : any;
  public categorias: any;
  public competicion: any;
  public currentYear = 2018;
  public dateBornAtleta : any;
  //classroomForm: FormGroup;
  //students: FormArray;
  
  constructor(
    public api: RestService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    public toastController: ToastController
  ) { 
    this.adminPassword = 'Jesucristo7778+'
    this.atleta = {};
    this.getCategorias();
    this.getCompeticion();
    this.getAtletaById(this.route.snapshot.paramMap.get('id'));
    /*this.AtletaForm = this.formBuilder.group({
      'atleta_name' : [null, Validators.required]
    });*/
    this.atle = {};
  }

  ngOnInit() {
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
  async getAtletaById(id) {
    const loading = await this.loadingController.create({
      content: 'Loading'
    });
    await loading.present();
    await this.api.getAtletaById(id).subscribe(res => {
      this.atleta = res;
      //var dateBorn = res.fecha_nacimiento.split('-');
      //this.dateBornAtleta = new Date(+dateBorn[0],+dateBorn[1],+dateBorn[2],0,0,0);
      this.atleta.fechaNacimiento = new Date(res.fecha_nacimiento).toISOString();
      //console.log(this.dateBornAtleta);
      //this.AtletaForm.controls['atleta_name'].setValue(res.nombres/*res.class_name*/);
      //let controlArray = <FormArray>this.AtletaForm.controls['atletas'];
      /*res.students.forEach(std => {
        controlArray.push(this.formBuilder.group({
           student_name: ''
        }));
      });
      for(let i=0;i<res.students.length;i++) {
        controlArray.controls[i].get('student_name').setValue(res.students[i].student_name);
      }
      console.log(this.classroomForm);*/
      //console.log(this.AtletaForm);
      loading.dismiss();
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }
  async updateAtleta(){
    const alert = await this.alertController.create({
      header: '¿Modificar datos de Atleta?',
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
    
    /*
    console.log(this.AtletaForm.value);
    await this.api.updateClassroom(this.route.snapshot.paramMap.get('id'), this.classroomForm.value)
    .subscribe(res => {
        let id = res['id'];
        this.router.navigate(['/detail', JSON.stringify(id)]);
      }, (err) => {
        console.log(err);
      });*/
  }
  async AutoriceAdmin(){
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
      console.log(this.atleta.fechaNacimiento);
      if(this.atleta.fechaNacimiento.year == undefined){
        this.atleta.fecha_nacimiento = this.atleta.fechaNacimiento.getYear()+"-"+this.atleta.fechaNacimiento.getMonth()+"-"+this.atleta.fechaNacimiento.getDay();
        this.updAtleta();        
      }else{
        this.atleta.fecha_nacimiento = this.atleta.fechaNacimiento.year.value+"-"+this.atleta.fechaNacimiento.month.value+"-"+this.atleta.fechaNacimiento.day.value;
        this.updAtleta();
      }
      /*const loading = await this.loadingController.create({
        content: 'Almacenando Atleta'
      });
      await loading.present();
  
      let hideFooterTimeout = setTimeout(() => {
        this.otrafunction(loading);
      }, 2000);*/
    }
  }
  async updAtleta(){
    console.log(this.atleta);
    const loading = await this.loadingController.create({
      content: 'Actualizando Atleta'
    });
    await loading.present();
    await this.api.putAtleta(this.atleta)
    .subscribe(res => {
      loading.dismiss();
        console.log(res);
        this.atletaActualizado();
        /*let id = res['id'];
        this.router.navigate(['/detail/'+id]);*/
      }, (err) => {
        console.log(err);
        loading.dismiss();
        this.errorActualizacion();
      });
  }
  async atletaActualizado(){
    const toast = await this.toastController.create({
      message: 'Excelente!! Atleta Actualizado Correctamente.',
      duration: 2000,
      position : 'middle' 
    });
    toast.present();
   }
   async errorActualizacion(){
    const toast = await this.toastController.create({
      message: 'Error al actualizar al atleta.',
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
  private getAge(init, current){
    let age = current - init;
    return age;
  }
  async getCategoria(){
    if(this.atleta.fechaNacimiento == undefined){
      
    }else{
      if(this.atleta.genero == undefined){

      }else{
        if(this.atleta.fechaNacimiento.year == undefined){
          this.atleta.categoriaInscripcion = this.getCategoriaAgeGen(this.getAge(this.atleta.fechaNacimiento.getYear(),this.currentYear),this.atleta.genero);               
        }else{
          this.atleta.categoriaInscripcion = this.getCategoriaAgeGen(this.getAge(this.atleta.fechaNacimiento.year.value,this.currentYear),this.atleta.genero);        
        }
      }
    }
    /*const toast = await this.toastController.create({
      message: 'Calculate Categoría',
      duration: 2000,
      position : 'middle' 
    });
    toast.present();*/
  }
  private getCategoriaAgeGen(age,gen){
    if(this.atleta.elite){
      return "Elite";
    }else{
      if(age < 39){
        if(gen == 'Femenino'){
          for(var i in this.categorias){
            if(this.categorias[i].nombre == "Libre Femenino"){
              this.atleta.id_categoria = this.categorias[i].id;
              return "Libre Femenino";
            }
          }
        }else{
          for(var i in this.categorias){
            if(this.categorias[i].nombre == "Libre Masculino"){
              this.atleta.id_categoria = this.categorias[i].id;
              return "Libre Masculino";
            }
          }
        }
      }else{
        for(var i in this.categorias){
          if(this.categorias[i].nombre == "Master Masculino"){
            this.atleta.id_categoria = this.categorias[i].id;
            return "Master Masculino";
          }
        }
      }
    }
  }
}
