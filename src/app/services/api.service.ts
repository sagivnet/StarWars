import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core'; 

@Injectable({providedIn: 'root'})  
export class ApiService {
            
  api_url = 'https://swapi.dev/api/'; 

  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    const err = error.error ? error.error : error;
    console.log(err); /*verbose*/
    return [];
  }


  createHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('content-type', 'application/json')
      .set('content-type', 'text/html')
  }

  get(path: string): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(this.api_url + path)
      .pipe(catchError(this.formatErrors));
  }

}