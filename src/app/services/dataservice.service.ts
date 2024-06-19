import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { serverUrl} from '../config'

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  private serverUrl = serverUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

 
  fetchData(): Observable<any[]> {
    const url = `${this.serverUrl}/login`; // Replace '/login' with the actual endpoint to fetch data from
    return this.http.get<any[]>(url);
  }

  //   return this.http.get(url, { headers: headers });
  getTransactionDetails(): Observable<any[]> {
    const url = `${this.serverUrl}/transactionhistory?bankid=rbs-rbs-a&accountid=12345`;
  
    // Define your headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.cookieService.get("token")
    });
  
    // Pass the headers as an option in the HTTP GET request
    return this.http.get<any[]>(url, { headers: headers });
  }
  // }
}

