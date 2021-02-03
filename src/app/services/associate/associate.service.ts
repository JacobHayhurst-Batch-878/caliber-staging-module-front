import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Associate } from '../../models/associate-model/associate.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {

  constructor( private http: HttpClient ) {  }
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*/*',
        'Access-Control-Allow-Methods': 'OPTIONS, HEAD, GET, POST, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type',
      }
    )
  }
  getAllAssociates(id:number): Observable<Associate[]> { 
    return this.http.get<Associate[]>(`${environment.BASE_URL}associates?manager=${id}`,this.httpOptions)  
  }

  getAllNewAssociates(id:number): Observable<Associate[]> { 
    return this.http.get<Associate[]>(`${environment.BASE_URL}associates/new?manager=${id}`,this.httpOptions)  
  }
}

