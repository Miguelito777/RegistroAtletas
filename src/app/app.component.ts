import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Inscripción de Atletas',
      url: '/InscripcionAtletas',
      icon: 'list'
    },
    {
      title: 'Categoria Libre Masculino',
      url: '/LibreMasculino',
      icon: 'list'
    },
    {
      title: 'Categoria Libre Femenino',
      url: '/LibreFemenino',
      icon: 'list'
    },
    {
      title: 'Categoria Master Masculino',
      url: '/MasterMasculino',
      icon: 'list'
    },
    {
      title: 'Categoria Elite',
      url: '/Elite',
      icon: 'list'
    },
    {
      title: 'Reportes de Inscripción',
      url: '/Reportes',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    console.log("Juan 3:16 Dios amó tanto a la gente de este mundo, que me entregó a mí, que soy su único Hijo, para que todo el que crea en mí no muera, sino que tenga vida eterna.");
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
