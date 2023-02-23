import { Product } from "./models";
import { apiInstance } from "../base";

const BASE_URL = "/products";

export const getProductsList = (): Promise<Product[]> => {
  return apiInstance.get(BASE_URL);
};

export type GetTaskByIdParams = {
  productId: number | string;
  [x: string]: any;
};

export const getProductById = ({
  productId,
}: GetTaskByIdParams): Promise<Product> => {
  return apiInstance.get(`${BASE_URL}/${productId}`);
};
