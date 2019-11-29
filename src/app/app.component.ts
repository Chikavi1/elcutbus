import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UsuarioProvider } from '../providers/usuario/usuario';


import { BackgroundPage } from '../pages/background/background';
import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;
  showSplash = true;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              public _usuarioProv: UsuarioProvider) {
    platform.ready().then(() => {
      
        if (platform.is('android')) {
            statusBar.backgroundColorByHexString("#33000000");
          }
        splashScreen.hide();
        timer(2600).subscribe(() => this.showSplash = false)

        if(localStorage.getItem("clave")){
          this.rootPage = HomePage;
        }else{
          this.rootPage = LoginPage;
        }
    });
  }
}

