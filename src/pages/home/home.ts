import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { Observable } from 'rxjs/Observable';
import { RutaPage } from '../ruta/ruta';
import {LoginPage} from '../login/login';
import * as moment from 'moment';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat:number;
  lng:number;
  user:any = {};
  icon= "https://i.ibb.co/Q83Cj1S/bus.png";
  camiones = [];

  init = false;

  modelo;




  constructor(public navCtrl: NavController,public _ubicacionProv: UbicacionProvider) {
  	// this._ubicacionProv.iniciarGeoLocalizacion();
  	// this._ubicacionProv.taxista.valueChanges()
  	//		.subscribe(data => {
  	//			this.user = data;
  	// });

     
    
  }

 



cerrar_sesion(){
  this._ubicacionProv.borrar_registro(localStorage.getItem("id_ubicacion"))
  this.navCtrl.push(LoginPage);
  localStorage.removeItem("clave");
  localStorage.removeItem("nombre");
  localStorage.removeItem("id_ubicacion");
  localStorage.removeItem("hora_ubicacion");
}
  irRuta(ruta){
  	this.navCtrl.push(RutaPage,{ruta: ruta});
  }




}
