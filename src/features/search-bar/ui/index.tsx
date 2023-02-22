import { useState } from "react";

import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { MultiDropdown, type Option } from "@shared/ui/multi-dropdown";

import { ReactComponent as FilterIcon } from "./filter.svg";
import { ReactComponent as SearchIcon } from "./search.svg";
import s from "./styles.module.scss";
import { pluralizeOptions } from "../lib";

const options: Option[] = [
  { key: "chair", value: "Chair" },
  { key: "table", value: "Table" },
  { key: "decoration", value: "Decoration" },
  { key: "cupboard", value: "Cupboard" },
];
export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [currOptions, setCurrOptions] = useState<Option[]>([]);
  return (
    <div className={s.root}>
      <div className={s.search_bar}>
        <Input
          className={s.input}
          placeholder={"Search property"}
          value={query}
          onChange={setQuery}
        />
        <SearchIcon className={s.search_icon} />
        <Button className={s.search_button}>Find Now</Button>
      </div>
      <div className={s.filter}>
        <MultiDropdown
          options={options}
          value={currOptions}
          onChange={setCurrOptions}
          pluralizeOptions={pluralizeOptions}
        />
        {currOptions.length === 0 && (
          <div className={s.filter_text_wrapper}>
            <FilterIcon className={s.filter_icon} />
            <p className={s.filter_text}>Filter</p>
          </div>
        )}
      </div>
    </div>
  );
};
