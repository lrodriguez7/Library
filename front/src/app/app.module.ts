import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SigninComponent } from './components/sign/signin/signin.component';
import { SignoutComponent } from './components/sign/signout/signout.component';
import { HomeComponent } from './components/start/home/home.component';
import { ReadingComponent } from './components/start/reading/reading.component';
import { BooksComponent } from './components/start/books/books.component';
import { MagazinesComponent } from './components/start/magazines/magazines.component';

import { LibrarianComponent } from './components/users/librarian/librarian.component';
import { StudentComponent } from './components/users/student/student.component';
import { AboutComponent } from './components/start/about/about.component';
import { DefaultComponent } from './components/headers/default/default.component';
import { UsersComponent } from './components/users/admin/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignoutComponent,
    HomeComponent,
    ReadingComponent,
    BooksComponent,
    MagazinesComponent,
    LibrarianComponent,
    StudentComponent,
    AboutComponent,
    DefaultComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
