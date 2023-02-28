import { productModel } from "@entities/product";
import { ProductSlider } from "@entities/products-slider";
import { Meta } from "@shared/api";
import { Button } from "@shared/ui/button";
import cn from "classnames";
import { observer } from "mobx-react-lite";

import s from "./styles.module.scss";

export const CardInfo = observer(() => {
  const { product, meta } = productModel.useProductStore();

  if (!product || meta === Meta.LOADING) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.root}>
      <div className={s.left_block}>
        <ProductSlider images={product.images} />
      </div>
      <div className={s.right_block}>
        <div className={"card-info__text"}>
          <h2 className={s.card_info__title}>{product.title}</h2>
          <p className={s.card_info__text}>{product.description}</p>
          <p className={s.card_info__price}>${product.price}</p>
        </div>
        <div className={s.card_info__buttons}>
          <Button className={s.card_info__button}>Buy Now</Button>
          <Button className={cn(s.card_info__button, s.card_info__add_button)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
});
