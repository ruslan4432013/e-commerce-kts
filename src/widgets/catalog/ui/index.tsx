import { PriceContent } from "@entities/price-content";
import { productSessionModel } from "@features/product-session";
import { Card } from "@shared/ui/card";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";

import s from "./styles.module.scss";

export const Catalog = observer(() => {
  const { products, loadMore, hasMore } =
    productSessionModel.useProductListStore();

  return (
    <main className={s.root}>
      <div className={s.description}>
        <h2 className={s.description_title}>Total Products</h2>
        <div className={s.description_badge}>{products.length}</div>
      </div>

      <InfiniteScroll
        next={loadMore}
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
});
