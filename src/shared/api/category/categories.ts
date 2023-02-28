import { Category } from "./models";
import { apiInstance } from "../base";

const BASE_URL = "/categories";

export const getCategoryList = (): Promise<Category[]> => {
  return apiInstance.get(BASE_URL);
};
