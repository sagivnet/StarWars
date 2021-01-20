import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  { path: '', redirectTo: '/films', pathMatch: 'full'},
  { path: 'films', component: HomeComponent },
  { path: 'films/:id', component: DetailsComponent },
  { path: 'characters/:id', component: DetailsComponent },
  { path: 'people/:id', component: DetailsComponent },
  { path: 'planets/:id', component: DetailsComponent },
  { path: 'startships/:id', component: DetailsComponent },
  { path: 'vehicles/:id', component: DetailsComponent },
  { path: 'species/:id', component: DetailsComponent },
  { path: 'residents/:id', component: DetailsComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
