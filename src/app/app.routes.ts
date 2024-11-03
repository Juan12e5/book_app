import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; 
import { BookListComponent } from './components/book-list/book-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'books', component: BookListComponent }, 
];
