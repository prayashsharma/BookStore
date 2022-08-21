import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Book from "../models/book";
import Category from "../models/category";
import categoryService from "../services/categoryService";
import bookService from "../services/bookService";
import bookFormSchema from "../validation/bookFormSchema";
import FormValidationErrorModel from "../models/formValidationErrorModel";
import BookFormViewModel from "../models/bookFormViewModel";

function BookForm(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState<BookFormViewModel>({
    Name: "",
    Price: "",
    Author: "",
    CategoryId: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [validationErrors, setValidationErrors] =
    useState<FormValidationErrorModel>({});

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
    const errors = validateForm();
    setValidationErrors(errors || {});
    if (errors) return;
    await bookService.saveBook(mapToBook(book));
    navigate("../books", { replace: true });
  };

  const populateBook = async () => {
    try {
      const bookId = params.id!;
      if (bookId === "new") return;
      const currentBook: Book = await bookService.getBook(bookId);
      setBook(mapToBookFormViewModel(currentBook));
    } catch (ex: any) {
      if (ex.response && ex.response.status === 404) {
        navigate("../notFound", { replace: true });
      }
    }
  };

  const validateForm = () => {
    const options = { abortEarly: false };
    const result = bookFormSchema.validate(book, options);
    if (!result.error) return null;
    const errors: FormValidationErrorModel = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    console.log(errors);
    return errors;
  };

  const validateProperty = (name: string, value: any) => {
    const inputSchema = bookFormSchema.extract(name);
    const result = inputSchema.validate(value);
    if (!result.error) return null;
    return result.error.message;
  };

  const handleChange = (name: string, value: any) => {
    //const { name, value } = event.target;
    const errors = { ...validationErrors };
    const errorMessage = validateProperty(name, value);
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];
    setValidationErrors(errors);
    setBook({ ...book, [name]: value });
  };

  const mapToBookFormViewModel = (book: Book): BookFormViewModel => {
    return {
      Id: book.Id,
      Name: book.Name,
      Price: book.Price,
      Author: book.Author,
      CategoryId: book.Category.Id,
    };
  };

  const mapToBook = (bookViewModel: BookFormViewModel): Book => {
    return {
      Id: bookViewModel.Id,
      Name: bookViewModel.Name,
      Price: bookViewModel.Price,
      Author: bookViewModel.Author,
      Category: { Id: bookViewModel.CategoryId, Name: "" },
    };
  };

  return (
    <form onSubmit={submitForm}>
      <div className="mb-3">
        <label htmlFor="Name">Name</label>
        <input
          value={book.Name}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          name="Name"
          id="Name"
          type="text"
          className="form-control"
        />
        {validationErrors["Name"] && (
          <div className="validation-errors form-text">
            {validationErrors["Name"]}
          </div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="Price">Price</label>
        <input
          value={book.Price}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          name="Price"
          id="Price"
          type="text"
          className="form-control"
        />
        {validationErrors["Price"] && (
          <div className="validation-errors form-text">
            {validationErrors["Price"]}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="Author">Author</label>
        <input
          value={book.Author}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          name="Author"
          id="Author"
          type="text"
          className="form-control"
        />
        {validationErrors["Author"] && (
          <div className="validation-errors form-text">
            {validationErrors["Author"]}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="CategoryId">Category</label>
        <select
          id="CategoryId"
          name="CategoryId"
          value={book.CategoryId}
          className="form-control"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        >
          <option value="" />
          {categories.map((category) => (
            <option key={category.Id} value={category.Id}>
              {category.Name}
            </option>
          ))}
        </select>
        {validationErrors["CategoryId"] && (
          <div className="validation-errors form-text">
            {validationErrors["CategoryId"]}
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary my-3">
        Submit
      </button>

      <button
        type="button"
        className="btn btn-secondary mx-2"
        onClick={() => navigate("../books", { replace: true })}
      >
        Cancel
      </button>
    </form>
  );
}

export default BookForm;
