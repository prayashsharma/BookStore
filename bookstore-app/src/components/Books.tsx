import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BooksTable from "./BooksTable";
import Book from "../models/book";
import bookService from "../services/bookService";
import ConfirmModal from "./common/ConfirmModal";

function Books() {
  const [books, setBooks] = useState<Book[]>([]);

  const [popup, setPopup] = useState({
    show: false,
    id: "",
  });

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
      <BooksTable items={books} onRemoveBook={handleRemoveBook} />
    </React.Fragment>
  );
}

export default Books;
