import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Book from "../models/book";
import DeleteConfirmationModel from "../models/deleteConfirmationModel";
import SortColumnModel from "../models/sortColumnModel";
import ConfirmModal from "./common/ConfirmModal";
import SortIcon from "./common/SortIcon";

interface BooksTableProps {
  items: Book[];
  sortColumn: SortColumnModel;
  onRemoveBook: (id?: string) => void;
  onSortTable: (sortColumn: SortColumnModel) => void;
}

function BooksTable({
  items,
  sortColumn,
  onRemoveBook,
  onSortTable,
}: BooksTableProps) {
  const [deleteConfirmation, setDeleteConfirmation] =
    useState<DeleteConfirmationModel>({
      show: false,
      entityId: null,
    });

  const handleConfirmModalOpen = (id?: string) => {
    setDeleteConfirmation({
      show: true,
      entityId: id!,
    });
  };

  const handleConfirm = () => {
    if (deleteConfirmation.show && deleteConfirmation.entityId) {
      onRemoveBook(deleteConfirmation.entityId);
      setDeleteConfirmation({
        show: false,
        entityId: null,
      });
    }
  };

  const handleConfirmCancel = () => {
    setDeleteConfirmation({
      show: false,
      entityId: null,
    });
  };

  const handleSortTable = (column: string) => {
    if (sortColumn.Column === column)
      sortColumn.Order = sortColumn.Order === "asc" ? "desc" : "asc";
    else {
      sortColumn.Column = column;
      sortColumn.Order = "asc";
    }
    onSortTable(sortColumn);
  };

  const navigate = useNavigate();
  return (
    <React.Fragment>
      <table className="table">
        <thead>
          <tr>
            <th className="clickable" onClick={() => handleSortTable("Name")}>
              Name
              <SortIcon column={"Name"} currentSortColumnModel={sortColumn} />
            </th>
            <th className="clickable" onClick={() => handleSortTable("Price")}>
              Price
              <SortIcon column={"Price"} currentSortColumnModel={sortColumn} />
            </th>
            <th className="clickable" onClick={() => handleSortTable("Author")}>
              Author
              <SortIcon column={"Author"} currentSortColumnModel={sortColumn} />
            </th>
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
                  onClick={() => navigate("/books/" + item.Id)}
                  className="btn btn-outline-primary mx-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleConfirmModalOpen(item.Id)}
                  className="btn btn-outline-danger mx-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteConfirmation.show && (
        <ConfirmModal
          id={deleteConfirmation.entityId!}
          title={"Confirm Delete"}
          bodyMessage={"Are you sure you want to delete this book?"}
          onConfirm={handleConfirm}
          onConfirmCancel={handleConfirmCancel}
        />
      )}
    </React.Fragment>
  );
}

export default BooksTable;
