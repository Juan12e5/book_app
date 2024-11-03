import { Component, ViewChild } from '@angular/core';
import { BookService } from '../../services/book/book.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../../shared/components/alert/alert.component';


@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  bookForm: FormGroup;
  token: string;
  @ViewChild(AlertComponent) alertComponent!: AlertComponent;


  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.token = localStorage.getItem('token') ?? '';
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addBook(): void {
    if (!this.token) {
        this.alertComponent.showAlert('No estás autenticado. Por favor inicia sesión.', 'error');
        return;
    }

    if (this.bookForm.valid) {
        this.bookService.addBook(this.bookForm.value, this.token).subscribe({
            next: () => {
                this.alertComponent.showAlert('Libro agregado correctamente', 'success');
                setTimeout(() => {
                    this.router.navigate(['/dashboard/books']);
                }, 1000);
            },
            error: (err) => {
                console.error('Error al agregar el libro:', err);
                this.alertComponent.showAlert('Error al agregar el libro. Por favor, intenta nuevamente.', 'error');
            }
        });
    } else {
        this.alertComponent.showAlert('Por favor completa todos los campos requeridos.', 'warning');
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/books']);
  }
}
