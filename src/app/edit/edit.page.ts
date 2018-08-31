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
    this.getAtletaById(this.route.snapshot.paramMap.get('id'));
    this.AtletaForm = this.formBuilder.group({
      'atleta_name' : [null, Validators.required]/*,
      'students' : this.formBuilder.array([])*/
    });
    this.atle = {};
  }

  ngOnInit() {
  }
  async getAtletaById(id) {
    const loading = await this.loadingController.create({
      content: 'Loading'
    });
    await loading.present();
    await this.api.getAtletaById(id).subscribe(res => {
    this.AtletaForm.controls['atleta_name'].setValue(res.nombres/*res.class_name*/);
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
  async updateClassroom(){
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
