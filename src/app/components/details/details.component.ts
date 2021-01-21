import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StarwarsService } from 'src/app/services/starwars.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  element; // element to display
  image = null;
  elementLinks = []; 
  elementStrings = [];

  constructor(private starwarsService: StarwarsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    let id: number = parseInt(this.route.snapshot.paramMap.get('id'));
    let category: string = this.router.url.substring(1,this.router.url.lastIndexOf('/'));

    // patch
    category = category == 'characters'? 'people' : category === 'residents'? 'people' : category === 'homeworld'? 'planets' :  category

    // try to get from local storage
    this.element = this.starwarsService.getLocaly(category, id)

    // if not found send a get request
    if(!this.element) {
      let url = 'https://swapi.dev/api/'+ category +'/'+id+'/';
      this.starwarsService.get(url).res
      .then(res =>{
        if (category == 'films'){
          this.image = '/assets/'+res.title.toLowerCase().replaceAll(' ','_')+'.jpg';
        }
        this.element = res;
        // extract information from element
        this.updateInfo()
      })
      .catch(err => {
        console.log(err);
        this.router.navigate(['/error','server_connection_error']);
      }) 
    } else {
      this.updateInfo()
    }
  }

  // Select Event
  onSelect (key, link){
    this.router.navigate(['/'+key, link.id]);
  }

  formatTitle(title: String){
    var splitStr =  title.replace(/\_/g, " ").toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
  }

  // extract information from element
  private updateInfo(){

    for (const [key, value] of Object.entries(this.element)) {
      if (key == 'image') {
        this.image = value;
        continue;
      }
      switch(typeof value) {

          case 'number':  break; // id
          case 'object': // link array
            let arr = [];
           
            for (let link of <Array<string>> value) {
              // get link info
              let promise = this.starwarsService.get(link).res
              let id = this.starwarsService.get(link).id

              promise.then(result => {
                result.id=id;    
                arr.push(result)})
              .catch(err => {
                  console.log(err);
                  this.router.navigate(['/error','server_connection_error']);
                }) 
            }
             // update state
            this.elementLinks.push({key, value: arr})
            break;
            
          case 'string': 
            if (key == 'title' || key == 'image' || key == 'url') break;

            if(value.search('http') != -1){ // single link
              let promise = this.starwarsService.get(value).res
              let id = this.starwarsService.get(value).id
              promise.then(result => {
                result.id=id;    
                this.elementLinks.push({key, value: [result]})
              })
              .catch(err => {
                console.log(err);
                this.router.navigate(['/error','server_connection_error']);
              }) 
              break; 
            }
            
            // try to build a date from value
            let date ;
            date = new Date(value) 
           
            if (!isNaN(date) && value.indexOf('-')!=-1){ //date
              // date format
              date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
              // update state
              this.elementStrings.push({key, value:date});
            } else { // not a date
              // update state
              this.elementStrings.push({key, value});
            }   
            break;
          default: break;
        }
    }
  }
}
