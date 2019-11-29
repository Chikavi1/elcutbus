import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';

//pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import {RutaPage} from '../pages/ruta/ruta';
import { FormPage } from '../pages/form/form';
import {BackgroundPage} from '../pages/background/background';

//providers
 import { UsuarioProvider } from '../providers/usuario/usuario';

import { AgmCoreModule } from '@agm/core';

// Plugins
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';


// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';





import { HttpModule } from '@angular/http';


import { firebaseConfig } from '../config/firebase.config';
import { UbicacionProvider } from '../providers/ubicacion/ubicacion';
import { LocationProvider } from '../providers/location/location';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RutaPage,
    FormPage,
    BackgroundPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
     AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAOlpW1fYkGXKr6K4ZzU7j1VTO4DCcrueI'
    })
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyA-HXVa2jtkGfKtIJwisxgC46RaWqC1xuI'
    // })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RutaPage,
    FormPage,
    BackgroundPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    BackgroundGeolocation,
    UbicacionProvider,
    Geolocation,
    LocationProvider
  ]
})
export class AppModule {}
