import { FC } from "react";

import s from "./styles.module.scss";

type Props = {
  content: string;
};

export const Slide: FC<Props> = ({ content }) => {
  const style = {
    backgroundImage: `url('${content}')`,
  };
  return <div className={s.slide} style={style} />;
};
