import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Monitors } from '../dashboard/interfaces/reportes.interface';


@Injectable({
  providedIn: 'root'
})
export class MonitoreoService {

  baseUrl = environment.baseUrl

  constructor(private http:HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }
  get headers(){
    return{
      headers:{
      'Authorization':this.token
      }
    } 
   }

   obtenerMonitores(){
    const url = `${this.baseUrl}/monitor`;
    return this.http.get(url,this.headers)

   }

   NuevoMonitor(data:FormGroup){
    const url = `${this.baseUrl}/monitor`;
    return this.http.post(url, data, this.headers)
    
   }

   EliminarMonitor(ip:string){
    const url = `${this.baseUrl}/monitor/${ip}`;
    return this.http.delete(url, this.headers)
    
   }

   Ping(ip:string){
    const url = `${this.baseUrl}/monitor/${ip}`;
    return this.http.get(url,this.headers)
   }

   crearReporte(){
     const url = `${this.baseUrl}/monitores/reporte`;
     return this.http.get(url, this.headers)
   }

   obtenerChequeos(desde:string, hasta:string){
    const url = `${this.baseUrl}/chequeos?desde=${desde}&hasta=${hasta}`;
    return this.http.get<Monitors>(url, this.headers)
   }
}
