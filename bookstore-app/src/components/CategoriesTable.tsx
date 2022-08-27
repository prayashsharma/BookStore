import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Category from "../models/category";
import DeleteConfirmationModel from "../models/deleteConfirmationModel";
import ConfirmModal from "./common/ConfirmModal";
import bookService from "../services/bookService";

interface CategoriesTableProps {
  items: Category[];
  onRemoveCategory: (id?: string) => void;
}

function CategoriesTable({ items, onRemoveCategory }: CategoriesTableProps) {
  const [deleteConfirmation, setDeleteConfirmation] =
    useState<DeleteConfirmationModel>({
      show: false,
      entityId: null,
    });

  const handleConfirmModalOpen = async (id?: string) => {
    const books = await bookService.getBooks();
    const filteredBook = books.filter((book) => book.Category.Id === id);
    if (filteredBook.length !== 0) {
      toast.warning("Cannot delete a category with books.");
      return;
    }

    setDeleteConfirmation({
      show: true,
      entityId: id!,
    });
  };

  const handleConfirm = () => {
    if (deleteConfirmation.show && deleteConfirmation.entityId) {
      onRemoveCategory(deleteConfirmation.entityId);
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

  const navigate = useNavigate();
  return (
    <React.Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.Id}>
              <td className="align-middle">{item.Name}</td>
              <td className="align-middle">
                <button
                  onClick={() => navigate("/categories/" + item.Id)}
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
          bodyMessage={"Are you sure you want to delete this category?"}
          onConfirm={handleConfirm}
          onConfirmCancel={handleConfirmCancel}
        />
      )}
    </React.Fragment>
  );
}

export default CategoriesTable;
