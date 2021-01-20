import { Injectable } from '@angular/core';
import { ApiService } from './api.service'; 

@Injectable({providedIn: 'root'})
export class StarwarsService {

  private apiService: ApiService;

  private data = {}; /*source*/

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

   get(fullUrl='https://swapi.dev/api/films/'){
    
    var pattern = "api/";
    var url = fullUrl.substr(fullUrl.indexOf(pattern)+ pattern.length); 
    var category = url.substr(0,url.indexOf('/'));
    var id =  url.substr(url.indexOf('/')+1,url.lastIndexOf('/') -url.indexOf('/')-1 )

    
    let promise = this.apiService.get(url)
    promise.toPromise().then(res => {
        if(category == 'films'){
            this.data[category] = res.results.map(e => {
                e.id = e.episode_id;
                return e;
            });
        } else {
            res.id = id;
            this.data[category]? this.data[category].push(res) : this.data[category] = [res]
        }

    })

     return {res: promise.toPromise(), id}
 }

 getLocaly(category, id) {

  if(this.data[category] ){
    return this.data[category].find(e => e.id === id)
  }
  return undefined;
 }
}