import { Product } from "./models";
import { apiInstance } from "../base";

const BASE_URL = "/products";

export type GetProductsListParams = {
  offset?: number;
  limit?: number;
};

export const getProductsList = (
  params?: GetProductsListParams
): Promise<Product[]> => {
  return apiInstance.get(BASE_URL, { params });
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
