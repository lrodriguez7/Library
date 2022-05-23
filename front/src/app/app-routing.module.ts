import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import { SigninComponent } from './components/sign/signin/signin.component';
import { AboutComponent } from './components/start/about/about.component';
import { UsersComponent } from './components/users/admin/users/users.component';
import { HomeComponent } from './components/start/home/home.component';
import { BooksComponent } from './components/start/books/books.component';


const routes: Routes = [

  { path:'', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'users', component: UsersComponent},
  { path: 'about', component: AboutComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'books', component: BooksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
