import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BookService {
    private apiUrl = 'http://localhost:3000/books';

    constructor(private http: HttpClient) {}

    getBooks(token: string): Observable<any> {
        return this.http.get(this.apiUrl, { headers: { Authorization: token } });
    }

    getBook(id: string, token: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`, { headers: { Authorization: token } });
    }

    addBook(book: any, token: string): Observable<any> {
        return this.http.post(this.apiUrl, book, { headers: { Authorization: token } });
    }

    updateBook(id: string, book: any, token: string): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, book, { headers: { Authorization: token } });
    }

    deleteBook(id: string, token: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { headers: { Authorization: token } });
    }
}
