import http from "../utils/httpClient";
import Book from "../models/book";

class BookService {
  async getBooks() {
    const response = await http.get<Book[]>("/api/Books");
    return response.data;
  }

  async getBook(id: string) {
    const response = await http.get("/api/Books/" + id);
    return response.data;
  }

  async saveBook(book: Book) {
    if (book.Id) {
      // const body = { ...book };
      return await this.editBook(book);
    }
    return await this.addBook(book);
  }

  async addBook(book: Book) {
    const response = await http.post<Book>("/api/Books", book);
    return response.data;
  }

  async editBook(book: Book) {
    const response = await http.put<Book>("/api/Books/" + book.Id, book);
    return response.data;
  }

  async removeBook(id?: string) {
    const response = await http.delete("/api/Books/" + id);
    return response.data;
  }
}

export default new BookService();
