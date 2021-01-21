import { Injectable } from '@angular/core';
import { ApiService } from './api.service'; 

@Injectable({providedIn: 'root'})
export class StarwarsService {

  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

   get(fullUrl='https://swapi.dev/api/films/'){

    // extract parameters
    var pattern = "api/";
    var url = fullUrl.substr(fullUrl.indexOf(pattern)+ pattern.length); 
    var id =  url.substr(url.indexOf('/')+1,url.lastIndexOf('/') -url.indexOf('/')-1 )

    
    let promise = this.apiService.get(url)
   
     return {res: promise.toPromise(), id}
 }

 
 
}