import { FC, ReactElement } from "react";

import { NOT_FOUND_TEXT, PAGE_NAMES } from "@shared/config";
import { PageMeta } from "@shared/ui/page-meta";

const NotFound: FC = (): ReactElement => (
  <div className="main not-found">
    <PageMeta title={PAGE_NAMES.PAGE_NOT_FOUND} />
    <h1>{NOT_FOUND_TEXT}</h1>
  </div>
);

export { NotFound };
