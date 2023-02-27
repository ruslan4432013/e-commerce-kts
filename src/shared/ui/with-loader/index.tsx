import React, { FC, PropsWithChildren } from "react";

import s from "./styles.module.scss";
import { Loader, LoaderSize } from "../loader";

export type WithLoaderProps = PropsWithChildren<{
  loading: boolean;
}>;

export const WithLoader: FC<WithLoaderProps> = ({ loading, children }) => {
  return (
    <div className={s.root}>
      {loading && <Loader className={s.loader} size={LoaderSize.s} />}
      {children}
    </div>
  );
};
