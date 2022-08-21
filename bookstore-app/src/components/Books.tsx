import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import BooksTable from "./BooksTable";
import Pagination from "./common/Pagination";
import SearchBox from "./common/SearchBox";
import Book from "../models/book";
import Category from "../models/category";
import SortColumnModel from "../models/sortColumnModel";
import bookService from "../services/bookService";
import categoryService from "../services/categoryService";
import { paginate } from "../utils/paginate";

function Books() {
  const pageSize = 5;

  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<SortColumnModel>({
    Column: "Name",
    Order: "asc",
  });

  const [currentPage, setCurrentPage] = useState(1);

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
    setCurrentPage(1);
  };

  const handleCategoryClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCategory(null);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: any) => {
    setSearchQuery(value);
  };

  const handleSort = (sortColumnModel: SortColumnModel) => {
    setSortColumn({
      ...sortColumn,
      Column: sortColumnModel.Column,
      Order: sortColumnModel.Order,
    });
  };

  const getPagedData = () => {
    let filteredBooks = books;
    if (searchQuery)
      filteredBooks = books.filter(
        (b) =>
          b.Name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          b.Author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else if (selectedCategory && selectedCategory.Id)
      filteredBooks = books.filter(
        (b) => b.Category.Id === selectedCategory.Id
      );

    const sortedBooks = _.orderBy(
      filteredBooks,
      [sortColumn.Column],
      [sortColumn.Order]
    );

    const paginatedmovies = paginate(sortedBooks, currentPage, pageSize);

    return { totalCount: filteredBooks.length, filteredBooks: paginatedmovies };
  };

  const { totalCount, filteredBooks } = getPagedData();

  return (
    <div className="row">
      <div className="col-3">
        <span className="badge text-bg-secondary mx-1 my-1">Filter by:</span>
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
              {item === selectedCategory && (
                <span
                  onClick={(e) => handleCategoryClear(e)}
                  className="badge rounded-pill text-bg-danger"
                  style={{ float: "right" }}
                >
                  x
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="col mx-4">
        <Link
          to="new"
          state={{ from: "books" }}
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Book
        </Link>

        {totalCount === 0 && <p>There are no books in the database.</p>}
        {totalCount > 0 && <p>Showing {totalCount} books in the database.</p>}
        <SearchBox value={searchQuery} onChange={handleSearch} />
        {totalCount > 0 && (
          <>
            <BooksTable
              items={filteredBooks}
              sortColumn={sortColumn}
              onRemoveBook={handleRemoveBook}
              onSortTable={handleSort}
            />
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
