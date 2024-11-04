import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book/book.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookFilterPipe } from '../../shared/pipes/book-filter.pipe';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BookFilterPipe],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  newBook: any = {};
  token: string;
  searchText: string = '';

  constructor(private bookService: BookService, private router: Router) {
    this.token = localStorage.getItem('token') ?? '';
  }

  ngOnInit() {
    this.bookService.getBooks(this.token).subscribe((data) => {
      this.books = data;
    });
  }

  addBook(): void {
    this.router.navigate(['/dashboard/books/add']);
  }

  editBook(bookId: string): void {
    this.router.navigate(['/dashboard/books/edit', bookId]);
  }

  confirmDelete(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      this.deleteBook(id);
    }
  }

  private deleteBook(id: string) {
    this.bookService.deleteBook(id, this.token).subscribe(() => {
      this.books = this.books.filter(book => book._id !== id);
      alert('Libro eliminado correctamente');
    }, (error) => {
      alert('Error al eliminar el libro');
    });
  }
}
