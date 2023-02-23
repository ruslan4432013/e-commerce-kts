import { ProductsPageDescription } from "@entities/products-page-description";
import { Navigation } from "@features/navigation";
import { SearchBar } from "@features/search-bar";

import s from "./styles.module.scss";

export const Header = () => {
  return (
    <header>
      <Navigation />
      <div className={s.container}>
        <ProductsPageDescription />
        <SearchBar />
      </div>
    </header>
  );
};
