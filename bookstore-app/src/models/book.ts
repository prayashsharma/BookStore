import Category from "./category";

//type Nullable<T> = T | null;

export default interface Book {
  Id?: string;
  Name: string;
  Price: string;
  Author: string;
  Category: Category;
}
