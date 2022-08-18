import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BooksTable from "./BooksTable";
import Book from "../models/book";
import Category from "../models/category";
import bookService from "../services/bookService";
import categoryService from "../services/categoryService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/Pagination";

function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  useEffect(() => {
    loadBooks();
    loadCategories();
  }, []);

  const loadBooks = async () => {
    const books = await bookService.getBooks();
    setBooks(books);
  };

  const loadCategories = async () => {
    const categories = await categoryService.getCategories();
    setCategories(categories);
  };

  const handleRemoveBook = (id?: string) => {
    setBooks(books.filter((book) => book.Id !== id));
    bookService.removeBook(id);
  };

  const handleCategorySelect = (category: Category | null) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPagedData = () => {
    let filteredBooks = books;
    if (searchQuery)
      filteredBooks = books.filter((b) =>
        b.Name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedCategory && selectedCategory.Id)
      filteredBooks = books.filter(
        (b) => b.Category.Id === selectedCategory.Id
      );

    const paginatedmovies = paginate(filteredBooks, currentPage, pageSize);

    return { totalCount: filteredBooks.length, filteredBooks: paginatedmovies };
  };

  const { totalCount, filteredBooks } = getPagedData();

  return (
    <div className="row">
      <div className="col-3">
        <ul className="list-group">
          {categories.map((item) => (
            <li
              onClick={() => handleCategorySelect(item)}
              key={item.Id}
              className={
                item === selectedCategory
                  ? "list-group-item active clickable"
                  : "list-group-item clickable"
              }
            >
              {item.Name}
            </li>
          ))}
        </ul>
      </div>
      <div className="col">
        <Link
          to="new"
          state={{ from: "books" }}
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Book
        </Link>
        {totalCount === 0 && <p>There are no books in the database.</p>}
        {totalCount > 0 && (
          <>
            <p>Showing {totalCount} books in the database.</p>
            <BooksTable items={filteredBooks} onRemoveBook={handleRemoveBook} />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Books;
