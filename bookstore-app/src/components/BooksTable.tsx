import React from "react";
import Book from "../models/book";

interface BooksTableProps {
  items: Book[];
  onRemoveBook: (id?: string) => void;
}

function BooksTable({ items, onRemoveBook }: BooksTableProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Author</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.Id}>
            <td>{item.Name}</td>
            <td>{item.Price}</td>
            <td>{item.Author}</td>
            <td>{item.Category.Name}</td>
            <td>
              <button
                onClick={() => onRemoveBook(item.Id)}
                className="btn btn-outline-danger mx-2 "
              >
                Edit
              </button>
              <button
                onClick={() => onRemoveBook(item.Id)}
                className="btn btn-outline-danger mx-2 "
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BooksTable;
