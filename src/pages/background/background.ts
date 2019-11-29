import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
//import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { LocationProvider } from '../../providers/location/location';
import { MAPCONFIG } from "../../models/map.data";


@Component({
  selector: 'page-background',
  templateUrl: 'background.html',
})
export class BackgroundPage {

  icon= "https://i.ibb.co/L16MJjx/icon-1.png";
  cut = "https://i.ibb.co/7k0b3KP/CUT-Sin-Fondo-2.png";

  latitudInicial:number = 20.620608;
  longitudInicial:number = -103.305311;

  latitudCutonala = 20.566187;
  longitudCutonala = -103.226863;

 locations = [];
 styles;
 nombre;

  constructor(public navCtrl: NavController, public navParams: NavParams,
          private toastCtrl: ToastController,public locationTracker: LocationProvider) {
  	    this.nombre = localStorage.getItem("nombre");
        this.styles = MAPCONFIG;

  }

 start(){
    this.locationTracker.startTracking();
  }

  stop(){
    this.locationTracker.stopTracking();
  }
 
 presentToast(location) {
  let toast = this.toastCtrl.create({
    message: "lat: "+location.latitude+" lng: "+location.longitude,
    duration: 1000,
    position: 'top'
  });

  toast.present();
}
}
