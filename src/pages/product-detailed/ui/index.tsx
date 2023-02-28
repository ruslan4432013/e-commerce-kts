import { productModel } from "@entities/product";
import { Navigation } from "@features/navigation";
import { hooks } from "@shared/lib";
import { CardInfo } from "@widgets/card-info";
import { RelatedItems } from "@widgets/related-items";
import { useParams } from "react-router-dom";

import s from "./styles.module.scss";

export const ProductDetailedPage = () => {
  const { productId } = useParams();

  if (!productId) {
    throw new Error("Product ID is undefined");
  }

  const productStore = hooks.useLocalStore(
    () => new productModel.store.ProductDetailedStore(productId)
  );

  return (
    <productModel.context.ProductProvider value={productStore}>
      <header>
        <Navigation />
      </header>
      <main className={s.main}>
        <CardInfo />
        <RelatedItems />
      </main>
    </productModel.context.ProductProvider>
  );
};
