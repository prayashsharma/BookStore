import http from "../utils/httpClient";
import Category from "../models/category";

class CategoryService {
  async getCategories() {
    const response = await http.get<Category[]>("/api/Categories");
    return response.data;
  }

  async getCategory(id: string) {
    const response = await http.get("/api/Categories/" + id);
    return response.data;
  }

  async saveCategory(category: Category) {
    if (category.Id) {
      // const body = { ...category };
      return await this.editCategory(category);
    }
    return await this.addCategory(category);
  }

  async addCategory(category: Category) {
    const response = await http.post<Category>("/api/Categories", category);
    return response.data;
  }

  async editCategory(category: Category) {
    const response = await http.put<Category>(
      "/api/Categories/" + category.Id,
      category
    );
    return response.data;
  }

  async removeCategory(id: string) {
    const response = await http.delete("/api/Categories/" + id);
    return response.data;
  }
}

export default new CategoryService();
