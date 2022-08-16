import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BooksTable from "./BooksTable";
import Book from "../models/book";
import bookService from "../services/bookService";

function Books() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const books = await bookService.getBooks();
    setBooks(books);
  };

  const handleRemoveBook = (id?: string) => {
    setBooks(books.filter((book) => book.Id !== id));
    bookService.removeBook(id);
  };

  const count = books.length;
  return (
    <React.Fragment>
      <Link
        to="new"
        state={{ from: "books" }}
        className="btn btn-primary"
        style={{ marginBottom: 20 }}
      >
        New Book
      </Link>
      {count === 0 && <p>There are no movies in the database.</p>}
      {count > 0 && (
        <>
          <p>Showing {count} movies in the database.</p>
          <BooksTable items={books} onRemoveBook={handleRemoveBook} />
        </>
      )}
    </React.Fragment>
  );
}

export default Books;
