import { productSessionModel } from "@features/product-session";
import { Catalog } from "@widgets/catalog";
import { Header } from "@widgets/header";

export const ProductsPage = () => {
  return (
    <productSessionModel.ProductSessionProvider>
      <div>
        <Header />
        <Catalog />
      </div>
    </productSessionModel.ProductSessionProvider>
  );
};
