import { FC } from "react";

import { ROUTE_CONSTANTS } from "@shared/config";
import { Route, Routes } from "react-router-dom";

import { NotFound } from "./not-found/NotFound";
import { ProductDetailedPage } from "./product-detailed";
import { ProductsPage } from "./products";

export const Router: FC = () => (
  <Routes>
    <Route path="*" element={<NotFound />} />
    <Route path={ROUTE_CONSTANTS.HOME} element={<ProductsPage />} />
    <Route path={ROUTE_CONSTANTS.PRODUCT} element={<ProductDetailedPage />} />
    <Route path={ROUTE_CONSTANTS.NOT_FOUND} element={<NotFound />} />
  </Routes>
);
