import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StarwarsService } from 'src/app/services/starwars.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  element;
  elementLinks = [];
  elementStrings = [];

  constructor(private starwarsService: StarwarsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let id: number = parseInt(this.route.snapshot.paramMap.get('id'));
    let category: string = this.router.url.substring(1,this.router.url.lastIndexOf('/'));
    category = category == 'characters'? 'people' : category
    this.element = this.starwarsService.getLocaly(category, id)
    if(!this.element) {
      let url = 'https://swapi.dev/api/'+ category +'/'+id+'/';
      this.starwarsService.get(url).res.then(res =>{
        this.element = res;

        for (const [key, value] of Object.entries(this.element)) {
          switch(typeof value) {
              case 'number':  break;
              case 'object':
                let arr = [];
               
                for (let link of <Array<string>> value) {
                  let promise = this.starwarsService.get(link).res
                  let id = this.starwarsService.get(link).id
                  promise.then(result => {result.id=id;    arr.push(result)}); 
                }
                this.elementLinks.push({key, value: arr})
                break;
                
              case 'string': 
                if (key == 'title' || key == 'image' || key == 'url') break;
                let date ;
    
                try {
                  date = new Date(value)
                } catch (e) { }
                if (!isNaN(date)){
                  date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
                  this.elementStrings.push({key, value:date});
                } else {
                  this.elementStrings.push({key, value});
    
                }
                
                break;
    
    
              default: break;
            }
    
        }
      })
    }
    
  }
  onSelect (key, link){
    this.router.navigate(['/'+key, link.id]);
  }


}
