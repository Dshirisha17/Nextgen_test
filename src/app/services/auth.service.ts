import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverUrl} from '../config'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private serverUrl = serverUrl;

  constructor(private http: HttpClient) {}
  
  login(username: string, password: string): Observable<any> {
    const url = `${this.serverUrl}/login`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = `username=${username}&password=${password}`;

    return this.http.post<any>(url, body, { headers: headers });
  }
  }



