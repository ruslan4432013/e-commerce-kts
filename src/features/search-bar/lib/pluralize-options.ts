import { Option } from "@shared/ui/multi-dropdown";

export const pluralizeOptions = (options: Option[]) => {
  return options.length > 0 ? `Chosen: ${options.length}` : "";
};
