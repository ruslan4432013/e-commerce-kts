import { Navigation } from "@features/navigation";
import { SearchBar } from "@features/search-bar";
import { ProductsPageDescription } from "@widgets/products-page-description";

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
