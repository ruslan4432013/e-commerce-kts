import { Navigation } from "@features/navigation";
import { CardInfo } from "@widgets/card-info";
import { RelatedItems } from "@widgets/related-items";

import s from "./styles.module.scss";

export const ProductDetailedPage = () => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className={s.main}>
        <CardInfo />
        <RelatedItems />
      </main>
    </>
  );
};
