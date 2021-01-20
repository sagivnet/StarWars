import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StarwarsService } from 'src/app/services/starwars.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  films: [];

  constructor(private starwarsService: StarwarsService, private router: Router) { }

  ngOnInit(): void {
   this.starwarsService.get().res.then(res => this.films = res.results);
  }

}
