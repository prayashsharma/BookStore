import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Book from "../models/book";
import Category from "../models/category";
import categoryService from "../services/categoryService";
import bookService from "../services/bookService";
import bookFormSchema from "../validation/bookFormSchema";
import FormValidationError from "../models/formValidationError";

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
  const [validationErrors, setValidationErrors] = useState<FormValidationError>(
    {}
  );

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
    const errors = validate();
    setValidationErrors(errors || {});

    if (errors) return;

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

  const validate = () => {
    const options = { abortEarly: false };
    const result = bookFormSchema.validate(book, options);
    if (!result.error) return null;

    const errors: FormValidationError = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  return (
    <form onSubmit={submitForm}>
      <div className="mb-3">
        <label htmlFor="Name">Name</label>
        <input
          value={book.Name}
          onChange={(e) => setBook({ ...book, Name: e.target.value })}
          // id="name"
          name="Name"
          type="text"
          className="form-control"
        />
        {validationErrors["Name"] && (
          <div className="alert alert-danger">{validationErrors["Name"]}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="Price">Price</label>
        <input
          value={book.Price}
          onChange={(e) => setBook({ ...book, Price: e.target.value })}
          // id="price"
          name="Price"
          type="text"
          className="form-control"
        />
        {validationErrors["Price"] && (
          <div className="alert alert-danger">{validationErrors["Price"]}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="Author">Author</label>
        <input
          value={book.Author}
          onChange={(e) => setBook({ ...book, Author: e.target.value })}
          //id="author"
          name="Author"
          type="text"
          className="form-control"
        />
        {validationErrors["Author"] && (
          <div className="alert alert-danger">{validationErrors["Author"]}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="Category">Category</label>
        <select
          //id="category"
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
        {validationErrors["Category"] && (
          <div className="alert alert-danger">
            {validationErrors["Category"]}
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary my-3">
        Submit
      </button>
    </form>
  );
}

export default BookForm;
