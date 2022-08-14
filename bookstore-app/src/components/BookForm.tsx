import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Book from "../models/book";
import Category from "../models/category";
import categoryService from "../services/categoryService";
import bookService from "../services/bookService";

function BookForm(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book>({
    Name: "",
    Price: "",
    Author: "",
    Category: { Id: "", Name: "" },
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    loadCategories();
    populateBook();
  }, []);

  const loadCategories = async () => {
    const categories = await categoryService.getCategories();
    setCategories(categories);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await bookService.saveBook(book);
    navigate("../books", { replace: true });
  };

  const populateBook = async () => {
    try {
      const bookId = params.id!;
      if (bookId === "new") return;

      const currentBook: Book = await bookService.getBook(bookId);
      setBook(currentBook);
    } catch (ex: any) {
      if (ex.response && ex.response.status === 404) {
        navigate("../notFound", { replace: true });
      }
    }
  };

  return (
    <form onSubmit={submitForm}>
      <div className="mb-3">
        <label htmlFor="name">Name</label>
        <input
          value={book.Name}
          onChange={(e) => setBook({ ...book, Name: e.target.value })}
          id="name"
          name="Name"
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="name">Price</label>
        <input
          value={book.Price}
          onChange={(e) => setBook({ ...book, Price: e.target.value })}
          id="price"
          name="Price"
          type="text"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="name">Author</label>
        <input
          value={book.Author}
          onChange={(e) => setBook({ ...book, Author: e.target.value })}
          id="author"
          name="Author"
          type="text"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="name">Category</label>
        <select
          name="Category"
          value={book.Category.Id}
          className="form-control"
          onChange={(e) =>
            setBook({
              ...book,
              Category: { Id: e.target.value, Name: "" },
            })
          }
        >
          <option value="" />
          {categories.map((category) => (
            <option key={category.Id} value={category.Id}>
              {category.Name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary my-3">
        Submit
      </button>
    </form>
  );
}

export default BookForm;
