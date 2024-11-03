import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book/book.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookForm: FormGroup;
  token: string;
  
  @ViewChild(AlertComponent) alertComponent!: AlertComponent;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = localStorage.getItem('token') ?? '';
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.getBook(bookId, this.token).subscribe(
        (data) => {
          this.bookForm.patchValue({
            title: data.title,
            author: data.author,
            description: data.description
          });
        },
        (error) => {
          this.alertComponent.showAlert('Error al cargar el libro. Intente de nuevo más tarde.', 'error');
          console.error(error);
        }
      );
    }
  }

  updateBook(): void {
    if (this.bookForm.valid) {
      const bookId = this.route.snapshot.paramMap.get('id');
      if (bookId) {
        this.bookService.updateBook(bookId, this.bookForm.value, this.token).subscribe(
          () => {
            this.alertComponent.showAlert('Libro actualizado correctamente', 'success');
            setTimeout(() => {
              this.router.navigate(['/dashboard/books']);
            }, 1000);
          },
          (error: HttpErrorResponse) => {
            this.alertComponent.showAlert('Error al actualizar el libro. Intente de nuevo más tarde.', 'error');
            console.error(error);
          }
        );
      }
    } else {
      this.alertComponent.showAlert('Por favor completa todos los campos requeridos.', 'warning');
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/books']);
  }
}
