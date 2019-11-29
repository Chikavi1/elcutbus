import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UsuarioProvider } from '../usuario/usuario';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Injectable()
export class UbicacionProvider {

     posOptions = {
             enableHighAccuracy: true,
             timeout:2500,
             maximumAge: 4050
         };  

  constructor( private afDB: AngularFirestore,
               private geolocation: Geolocation,
               public _usuarioProv: UsuarioProvider) {
  }

  obtenerCamiones(){
  console.log("PETICION get ");
  return this.afDB.collection('usuarios').snapshotChanges();
   //return this.afDB.collection('usuarios').valueChanges();
  }

  crear_usuario(record){
    return this.afDB.collection('usuarios/').add(record).then(function(docRef){
      localStorage.setItem("id_ubicacion",docRef.id);
      localStorage.setItem("hora_ubicacion",record.horario);
    });
  }

  borrar_registro(record_id) {
    console.log("PETICION delete");
    return this.afDB.doc('usuarios/' + record_id).delete();
  }

  obtenerubicacion(){

    return this.geolocation.getCurrentPosition();
  }
 
 creartiemporeal(){
 
   return this.geolocation.watchPosition(this.posOptions);
             
 }


  ubicacionTiempoReal() {

      return this.geolocation.watchPosition(this.posOptions)
              .subscribe((data) => {
                     //console.log(data.coords);

                      if(data.coords && localStorage.getItem("id_ubicacion")){
                       this.afDB.doc('usuarios/' + localStorage.getItem("id_ubicacion")).update({
                         lat: data.coords.latitude,
                         lng: data.coords.longitude
                       });

                }})
  }

}
