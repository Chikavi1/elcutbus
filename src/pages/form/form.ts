import { Component } from '@angular/core';
import {NavController, NavParams,ViewController } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';

import swal from 'sweetalert';

import * as moment from 'moment';


@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})

export class FormPage {

	modelo;
  ruta;
  	constructor(public navCtrl: NavController,public  viewCtrl: ViewController, public _ubicacionProv: UbicacionProvider, public navParams: NavParams) {
  }


enviar(){
  console.log(this.ruta);
	this.modelo = this.modelo.toUpperCase();
	this.crear_usuario(this.modelo);
	this.closeModal();
}

closeModal(){
     this.navCtrl.pop();
}


crear_usuario(modelo){

  	 let record = {};
  	 //let hora = moment().add(30,'minutes').format('HH:mm');
     let hora = moment().format('HH:mm');;
     console.log(hora);
  	this._ubicacionProv.obtenerubicacion().then((resp) => {

	     record['lat'] = resp.coords.latitude;
       record['lng'] = resp.coords.longitude;
	     record['nombre'] = localStorage.getItem("nombre");
	     record['horario'] = hora;
	     record['modelo'] = modelo;
       record['ruta'] = this.ruta;

    	 this._ubicacionProv.crear_usuario(record).then(resp=>{
	  	 });
     }).catch((error) => {
       console.log('Error location', error);
     });
  }

tConvert (time) {
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}

}
