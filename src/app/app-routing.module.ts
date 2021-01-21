import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: '', redirectTo: '/films', pathMatch: 'full'},
  { path: 'films', component: HomeComponent },
  { path: 'films/:id', component: DetailsComponent },
  { path: 'people/:id', component: DetailsComponent },
  { path: 'characters/:id',redirectTo: '/people/:id', pathMatch: 'full' },
  { path: 'residents/:id',redirectTo: '/people/:id', pathMatch: 'full' },
  { path: 'pilots/:id',redirectTo: '/people/:id', pathMatch: 'full' },
  { path: 'planets/:id', component: DetailsComponent },
  { path: 'homeworld/:id',redirectTo: '/planets/:id', pathMatch: 'full' },
  { path: 'starships/:id', component: DetailsComponent },
  { path: 'vehicles/:id', component: DetailsComponent },
  { path: 'species/:id', component: DetailsComponent },
  { path: 'error', component: DetailsComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
