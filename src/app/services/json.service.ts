import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
 

  private jsonUrl = 'https://solarandes2.s3.us-east-1.amazonaws.com/trabajadores.json';

  private listaTrabajadores:any;

  constructor(private http: HttpClient) {}

  getJsonData(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }
  
  actualizaTrabajadorOelimina(listaTrabajadores: any): Observable<any> {
    return this.http.put(this.jsonUrl, listaTrabajadores, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

 


  eliminarTodo(): Observable<any> {
    return this.http.delete(this.jsonUrl, {
      headers: { 'Content-Type': 'application/json' }
    });}


  /*  noAplicaSeusaElOtro(listaTrabajadores: any): Observable<any> {
      return this.http.post(this.jsonUrl, listaTrabajadores, {
        headers: { 'Content-Type': 'application/json' }
      });

  }
*/
}
  
