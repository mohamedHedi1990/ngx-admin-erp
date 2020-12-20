import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtResponse } from '../models/JwtResponse.model';
import { LoginRequest } from '../models/LoginRequest.model';
import { UtilsServiceService } from '../utils-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient,private UtilsService: UtilsServiceService,) { }



  login(loginRequest:LoginRequest):Observable<JwtResponse> {
    return this.http.post<JwtResponse>(UtilsServiceService.API_AUTH, loginRequest);
         
  }
  
}
