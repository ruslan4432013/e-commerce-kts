import s from "./styles.module.scss";

export const ProductsPageDescription = () => {
  return (
    <div className={s.root}>
      <h1 className={s.title}>Products</h1>
      <p className={s.description}>
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </p>
    </div>
  );
};
