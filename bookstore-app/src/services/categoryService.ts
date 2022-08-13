import http from "../utils/httpClient";
import Category from "../models/category";

class CategoryService {
  async getCategories() {
    const response = await http.get<Category[]>("/api/Categories");
    return response.data;
  }

  async addCategories(title: string) {
    const response = await http.post<Category>("/api/Categories", { title });
    return response.data;
  }

  async removeCategories(id: string) {
    const response = await http.delete("/api/Categories/" + id);
    return response.data;
  }
}

export default new CategoryService();
