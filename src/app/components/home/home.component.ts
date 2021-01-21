import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StarwarsService } from 'src/app/services/starwars.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  films = []; 

  constructor(private starwarsService: StarwarsService, private router: Router, private coockieService:CookieService) { }

  ngOnInit(): void {
    // get all the films
   this.starwarsService.get().res.then(res => {
     // get films likes from cookies
     this.films = res.results.map((film, index) => {
        film.id = index+1;
       let cookie = this.coockieService.get(film.episode_id);
       if (cookie) {
         film.like = cookie;
       }
       return film;
     })
    })
    .catch(err => {
      console.log(err);
      this.router.navigate(['/error','server_connection_error']);
    }) 
  }

  // Select Event
  onSelect(film) {
    this.router.navigate(['/films/', film.id]);
  }

  // Like Event
  onLike(film) {
    this.films.map(e=> {
      if (e.episode_id == film.episode_id){
        if(!e.like){ // not liked yet
          e.like = 2; // set to like
        } else if (e.like == 2) { //  like
          e.like = 1 ;  // set to dislike
        } else { // dislike
          e.like = 2; //set to like
        }
        this.coockieService.set(e.episode_id, e.like);
      }
      return e;
    })
  }
}
