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

  films= [];

  constructor(private starwarsService: StarwarsService, private router: Router, private coockieService:CookieService) { }

  ngOnInit(): void {
   this.starwarsService.get().res.then(res => {
     this.films = res.results.map(film => {
       let cookie = this.coockieService.get(film.episode_id);
       if (cookie) {
         film.like = cookie;
       }
       return film;
     })
    });
  }

  onSelect(film) {
    this.router.navigate(['/films', film.episode_id]);
  }

  onLike(film) {
    this.films.map(e=> {
      if (e.episode_id == film.episode_id){
        if(!e.like){
          e.like = 2;
        } else if (e.like == 2) {
          e.like = 1 ;
        } else {
          e.like = 2;
        }
        this.coockieService.set(e.episode_id, e.like);
      }
      return e;
    })

    // this.films.find(f => f.episode_id == film.id)
  }

}
