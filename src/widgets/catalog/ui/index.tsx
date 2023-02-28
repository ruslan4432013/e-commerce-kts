import { useEffect, useState } from "react";

import { PriceContent } from "@entities/price-content";
import { Product, productsApi } from "@shared/api";
import { Card } from "@shared/ui/card";
import InfiniteScroll from "react-infinite-scroll-component";

import s from "./styles.module.scss";

const PRODUCTS_LIMIT = 10;

export const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    const offset = products.length + PRODUCTS_LIMIT;
    const productsResponse = await productsApi.getProductsList({
      limit: PRODUCTS_LIMIT,
      offset,
    });

    if (productsResponse.length < PRODUCTS_LIMIT) {
      setHasMore(false);
    }

    setProducts((prev) => [...prev, ...productsResponse]);
  };

  useEffect(() => {
    productsApi
      .getProductsList({
        limit: PRODUCTS_LIMIT,
        offset: 0,
      })
      .then((res) => setProducts(res));
  }, []);

  return (
    <main className={s.root}>
      <div className={s.description}>
        <h2 className={s.description_title}>Total Products</h2>
        <div className={s.description_badge}>{products.length}</div>
      </div>

      <InfiniteScroll
        next={fetchProducts}
        hasMore={hasMore}
        loader={<h3>Loading...</h3>}
        dataLength={products.length}
      >
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
      </InfiniteScroll>
    </main>
  );
};
