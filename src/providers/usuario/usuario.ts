import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http,Headers } from '@angular/http';

import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class UsuarioProvider {
  clave:string;
  user:any = {};
  
  constructor(private db: AngularFirestore,
              private platform: Platform,
              private storage: Storage,
              public http: Http
              ) {
  }

  login(codigo,nip):any{
    let headers = new Headers();
    return this.http.get("http://api.chikavi.com/api/authchikavi?codigo="+codigo+"&nip="+nip,{headers: headers});
  }




  verificaUsuario(clave:string){
  	clave = clave.toLocaleLowerCase();
  	return new Promise((resolve,reject)=>{

  		this.db.doc(`/usuarios/${ clave }`)
  			.valueChanges().subscribe(data => {
  				if(data){
  				this.clave = clave;
  				this.user = data;
          this.guardarStorage();
  				resolve(true);
  				}else{
  				
  				resolve(false);
  				}
  			})
  	});
  }

  guardarStorage(){
 if ( this.platform.is('cordova')  ){
      // Celular
      this.storage.set('clave', this.clave);

    } else {
      // Escritorio
      localStorage.setItem('clave', this.clave);
    }
  }


   cargarStorage() {

    return new Promise( (resolve, reject) => {


      if ( this.platform.is('cordova')  ){
        // Celular
        
        this.storage.get('clave').then( val => {

          if ( val ) {
            this.clave = val;
            resolve(true);
          }else {
            resolve(false);
          }

        });
        
      } else {
        // Escritorio
        if ( localStorage.getItem('clave')){
          this.clave = localStorage.getItem('clave');
          resolve(true);
        }else {
          resolve(false);
        }

        
      }


    });


  }

}
