import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ConexionesService {

  get token():string{
    return localStorage.getItem('token') || '';
  }
  get headers(){
    return {
      'Authorization':this.token
    }
  }

  constructor(private http:HttpClient) { }

  
  hacerPing(){
    const url = `${base_url}/ping`;

    return this.http.get(url)
    
  }
}
