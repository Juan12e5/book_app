import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { LoginComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'books', component: BookListComponent }, 
];
