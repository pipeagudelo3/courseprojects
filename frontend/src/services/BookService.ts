import type { CreateBookDTO } from '@/dtos/CreateBookDTO';
import type { BookInterface } from '@/interfaces/BookInterface';
import { useBookStore } from '@/stores/bookstore';

export class BookService {
  static getBooks(): BookInterface[] {
    return useBookStore().books;
  }

  static getBookById(id: number): BookInterface | undefined {
    return useBookStore().books.find(
      (book) => book.id === id,
    );
  }

  static createBook(book: CreateBookDTO): BookInterface {
    const store = useBookStore();

    const nextId =
      store.books.length > 0
        ? Math.max(...store.books.map((item) => item.id)) + 1
        : 1;

    const newBook: BookInterface = {
      id: nextId,
      ...book,
    };

    store.books.push(newBook);

    return newBook;
  }

  static deleteLastBook(): BookInterface | undefined {
    return useBookStore().books.pop();
  }

  static getUniqueBookCategories(): string[] {
    const categories = BookService.getBooks().map(
      (book) => book.category,
    );

    return [...new Set(categories)].sort();
  }
}