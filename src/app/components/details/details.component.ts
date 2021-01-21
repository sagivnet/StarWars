import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
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

    category = category == 'characters'? 'people' : category === 'residents'? 'people' : category === 'homeworld'? 'planets' :  category

    this.element = this.starwarsService.getLocaly(category, id)
    if(!this.element) {
      let url = 'https://swapi.dev/api/'+ category +'/'+id+'/';
      this.starwarsService.get(url).res.then(res =>{
        this.element = res;
        this.updateInfo()

      })
    } else {
      this.updateInfo()
    }
    
  }
  onSelect (key, link){
    this.router.navigate(['/'+key, link.id]);
  }

  formatTitle(title: string){
    var splitStr =  title.replace('_', ' ').toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
  }

  private updateInfo(){
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

            console.log(value)
            if(value.search('http') != -1){
              let promise = this.starwarsService.get(value).res
              let id = this.starwarsService.get(value).id
              promise.then(result => {
                result.id=id;    
                this.elementLinks.push({key, value: [result]})
              });
              break; 
            }
            
            let date ;
            date = new Date(value)
           
            if (!isNaN(date) && value.indexOf('-')!=-1){
              date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
              this.elementStrings.push({key, value:date});
            } else {
              this.elementStrings.push({key, value});

            }
            
            break;


          default: break;
        }

    }
  }


}
