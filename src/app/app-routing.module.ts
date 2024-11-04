import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { AddBookComponent } from './components/add-book/add-book.component'; 
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { AuthMiddleware } from './services/middleware/auth.middleware';
import { LayoutComponent } from './layout/layout/layout.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthMiddleware],
    children: [
      { path: 'books', component: BookListComponent }, 
      { path: 'books/add', component: AddBookComponent },
      { path: 'books/edit/:id', component: EditBookComponent }
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
