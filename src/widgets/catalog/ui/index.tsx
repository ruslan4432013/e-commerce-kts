import { useState } from "react";

import { PriceContent } from "@entities/price-content";
import { Product } from "@shared/api";
import { useIsDesktopQuery } from "@shared/lib";
import { Card } from "@shared/ui/card";
import { Pagination } from "@shared/ui/pagination";
import { useLoaderData } from "react-router-dom";

import s from "./styles.module.scss";

const DESKTOP_MAX_CARDS = 9;
const MOBILE_MAX_CARDS = 10;

export const Catalog = () => {
  const products = useLoaderData() as Product[];
  const [currentPage, setCurrentPage] = useState(1);
  const isDesktop = useIsDesktopQuery();

  const maxItems = isDesktop ? DESKTOP_MAX_CARDS : MOBILE_MAX_CARDS;

  const totalPages = (): number => {
    return Math.ceil(products.length / maxItems);
  };

  const getProducts = () => {
    const offset = (currentPage - 1) * maxItems;
    return products.slice(offset, offset + maxItems);
  };

  return (
    <main className={s.root}>
      <div className={s.description}>
        <h2 className={s.description_title}>Total Products</h2>
        <div className={s.description_badge}>{products.length}</div>
      </div>
      <ul className={s.product_list__container}>
        {getProducts().map((product) => (
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages()}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </main>
  );
};
