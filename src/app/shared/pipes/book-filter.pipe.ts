import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookFilter',
  standalone: true
})
export class BookFilterPipe implements PipeTransform {
  transform(books: any[], searchText: string): any[] {
    if (!books || !searchText) {
      return books;
    }
    searchText = searchText.toLowerCase();
    return books.filter(book =>
      book.title.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText) ||
      book.description.toLowerCase().includes(searchText)
    );
  }
}
