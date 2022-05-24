import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceDbService {
  public database: SQLiteObject;
  tablaNoticias: string = "CREATE TABLE IF NOT EXISTS noticia(id INTEGER PRIMARY KEY autoincrement, titulo VARCHAR(50) NOT NULL, texto TEXT NOT NULL);";
  registro: string = "INSERT or IGNORE INTO noticia(id,titulo,texto) VALUES (1,'Vacaciones','Vacaciones de Verano');";
  listaNoticias = new BehaviorSubject([]);
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor(public toastController:ToastController, private platform: Platform, private sqlite: SQLite) { 
    this.crearBD();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  crearBD(){
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'noticia.db',
        location: 'default'
      }).then((db: SQLiteObject)=>{
        this.database = db;
        this.presentToast('Base de datos creada');
      }).catch(e=>this.presentToast(e));
    })
  }

  dbState(){
    return this.isDBReady.asObservable();
  }


  async crearTablas(){
    try {
      await this.database.executeSql(this.tablaNoticias, []);
      await this.database.executeSql(this.registro,[]);
      this.presentToast("Tablas creadas correctamente");
      this.isDBReady.next(true);
    } catch (error) {
      this.presentToast("Error en creación de tablas: "+error);
    }
  }
}
