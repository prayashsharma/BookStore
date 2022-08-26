import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Category from "../models/category";
import CategoryFormViewModel from "../models/categoryFormViewModel";
import FormValidationErrorModel from "../models/formValidationErrorModel";
import categoryService from "../services/categoryService";
import categoryFormSchema from "../validation/categoryFormSchema";

function CategoryForm(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState<CategoryFormViewModel>({
    Name: "",
  });

  // const [categories, setCategories] = useState<Category[]>([]);
  const [validationErrors, setValidationErrors] =
    useState<FormValidationErrorModel>({});

  useEffect(() => {
    populateCategory();
  }, []);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    setValidationErrors(errors || {});
    if (errors) return;
    await categoryService.saveCategory(mapToCategory(category));
    navigate("../categories", { replace: true });
  };

  const populateCategory = async () => {
    try {
      const categoryId = params.id!;
      if (categoryId === "new") return;
      const currentCategory: Category = await categoryService.getCategory(
        categoryId
      );
      setCategory(mapToCategoryFormViewModel(currentCategory));
    } catch (ex: any) {
      if (ex.response && ex.response.status === 404) {
        navigate("../notFound", { replace: true });
      }
    }
  };

  const validateForm = () => {
    const options = { abortEarly: false };
    const result = categoryFormSchema.validate(category, options);
    if (!result.error) return null;
    const errors: FormValidationErrorModel = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    console.log(errors);
    return errors;
  };

  const validateProperty = (name: string, value: any) => {
    const inputSchema = categoryFormSchema.extract(name);
    const result = inputSchema.validate(value);
    if (!result.error) return null;
    return result.error.message;
  };

  const handleChange = (name: string, value: any) => {
    const errors = { ...validationErrors };
    const errorMessage = validateProperty(name, value);
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];
    setValidationErrors(errors);
    setCategory({ ...category, [name]: value });
  };

  const mapToCategoryFormViewModel = (
    category: Category
  ): CategoryFormViewModel => {
    return {
      Id: category.Id,
      Name: category.Name,
    };
  };

  const mapToCategory = (
    categoryViewModel: CategoryFormViewModel
  ): Category => {
    return {
      Id: categoryViewModel.Id!,
      Name: categoryViewModel.Name,
    };
  };

  return (
    <form onSubmit={submitForm}>
      <div className="mb-3">
        <label htmlFor="Name">Name</label>
        <input
          value={category.Name}
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

      <button type="submit" className="btn btn-primary my-3">
        Submit
      </button>

      <button
        type="button"
        className="btn btn-secondary mx-2"
        onClick={() => navigate("../categories", { replace: true })}
      >
        Cancel
      </button>
    </form>
  );
}

export default CategoryForm;
