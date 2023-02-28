import { Category } from "@shared/api";
import { Option } from "@shared/ui/multi-dropdown";

export const categoriesToOptions = (categories: Category[]): Option[] => {
  return categories.map((category) => ({
    key: `${category.id}`,
    value: category.name,
  }));
};
