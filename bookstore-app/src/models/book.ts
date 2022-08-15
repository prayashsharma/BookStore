import Category from "./category";

export default interface Book {
  Id?: string;
  Name: string;
  Price: string;
  Author: string;
  Category: Category;
}
