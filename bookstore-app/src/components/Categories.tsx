import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Category from "../models/category";
import categoryService from "../services/categoryService";
import CategoriesTable from "./CategoriesTable";

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const categories = await categoryService.getCategories();
    setCategories(categories);
  };

  const handleRemoveCategory = (id?: string) => {
    setCategories(categories.filter((category) => category.Id !== id));
    categoryService.removeCategory(id!);
  };

  const totalCount = categories.length;
  return (
    <div className="row">
      <div className="col">
        <Link
          to="new"
          state={{ from: "categories" }}
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Category
        </Link>

        {totalCount === 0 && <p>There are no categories in the database.</p>}
        {totalCount > 0 && (
          <p>Showing {totalCount} categories in the database.</p>
        )}
        {totalCount > 0 && (
          <>
            <CategoriesTable
              items={categories}
              onRemoveCategory={handleRemoveCategory}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Categories;
