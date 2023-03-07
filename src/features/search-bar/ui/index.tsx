import { useEffect } from "react";

import { productSessionModel } from "@features/product-session";
import { Meta } from "@shared/api";
import { hooks } from "@shared/lib";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { MultiDropdown, type Option } from "@shared/ui/multi-dropdown";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import { ReactComponent as FilterIcon } from "./filter.svg";
import { ReactComponent as SearchIcon } from "./search.svg";
import s from "./styles.module.scss";
import { categoriesToOptions, pluralizeOptions } from "../lib";

type QParams = {
  q?: string;
  categoryId?: string;
};

export const SearchBar = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") || "";
  const query = hooks.useDebounce(search, 1000);
  const categoryId = searchParams.get("categoryId") || "";
  const { load, meta, setTitle } = productSessionModel.useProductListStore();
  const { categories, setCurrentCategory, currentCategory } =
    productSessionModel.useCategoryListStore();
  const queryParams: QParams = {
    q: search,
    categoryId,
  };

  useEffect(() => {
    setTitle(query);
    const offset = 0;
    const title = query.length > 0 ? query : null;
    load({ offset, title, categoryId });
  }, [query, categoryId]);
  const onChange = (val: string) => {
    const q = val || null;
    const categoryId = queryParams.categoryId || null;

    let params: undefined | Record<string, string> = undefined;
    if (q || categoryId) {
      // чтобы добавлять переменную в объект, только если она существует
      params = { ...(q && { q }), ...(categoryId && { categoryId }) };
    }
    setSearchParams(params);
  };

  useEffect(() => {
    if (!Number.isNaN(+categoryId)) {
      setCurrentCategory(+categoryId);
    }
  }, [categories, categoryId, setCurrentCategory]);

  const onCategoryChange = (options: Option[]) => {
    let option: [Option] | [];
    if (options.length === 1) {
      option = [options[0]];
    } else if (options.length === 2) {
      option = [options[1]];
    } else {
      option = [];
    }

    const { q } = queryParams;
    // Если какая-то из категорий выбрана
    if (option.length > 0 && !Number.isNaN(+option[0]!.key)) {
      const categoryId = option[0]!.key;
      setCurrentCategory(+categoryId);
      setSearchParams({
        ...(q && { q }),
        categoryId: `${categoryId}`,
      });
    } else {
      setCurrentCategory(null);
      const params = q ? { q } : undefined;
      setSearchParams(params);
    }
  };

  return (
    <div className={s.root}>
      <div className={s.search_bar}>
        <Input
          className={s.input}
          placeholder={"Search property"}
          value={search}
          onChange={onChange}
        />
        <SearchIcon className={s.search_icon} />
        <Button loading={meta === Meta.LOADING} className={s.search_button}>
          Find Now
        </Button>
      </div>
      <div className={s.filter}>
        <MultiDropdown
          options={categoriesToOptions(categories)}
          value={currentCategory ? categoriesToOptions([currentCategory]) : []}
          onChange={onCategoryChange}
          pluralizeOptions={pluralizeOptions}
        />
        {currentCategory === null && (
          <div className={s.filter_text_wrapper}>
            <FilterIcon className={s.filter_icon} />
            <p className={s.filter_text}>Filter</p>
          </div>
        )}
      </div>
    </div>
  );
});
