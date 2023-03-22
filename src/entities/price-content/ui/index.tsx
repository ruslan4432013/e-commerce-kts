import s from "./styles.module.scss";

type Props = {
  price: number;
};
export const PriceContent = ({ price }: Props) => {
  return <p className={s.product__content}>{price} $</p>;
};
