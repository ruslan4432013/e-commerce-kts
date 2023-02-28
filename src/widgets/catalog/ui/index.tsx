import { PriceContent } from "@entities/price-content";
import { Product } from "@shared/api";
import { Card } from "@shared/ui/card";
import { useLoaderData } from "react-router-dom";

import s from "./styles.module.scss";

export const Catalog = () => {
  const products = useLoaderData() as Product[];

  return (
    <main className={s.root}>
      <div className={s.description}>
        <h2 className={s.description_title}>Total Products</h2>
        <div className={s.description_badge}>{products.length}</div>
      </div>
      <ul className={s.product_list__container}>
        {products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            image={product.images[0]}
            title={product.title}
            division={product.category.name}
            subtitle={product.description}
            content={<PriceContent price={product.price} />}
          />
        ))}
      </ul>
    </main>
  );
};
