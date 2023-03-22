import { FC, MouseEventHandler, ReactNode, useId } from "react";

import cn from "classnames";
import { Link } from "react-router-dom";

import s from "./styles.module.scss";

export type CardProps = {
  id: string | number;
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: ReactNode;
  /** Подзаголовок карточки */
  subtitle: ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: ReactNode;
  /** Клик на карточку */
  onClick?: MouseEventHandler;
  division?: ReactNode;
};

export const Card: FC<CardProps> = (props) => {
  const { image, title, subtitle, content, onClick, division, id } = props;
  const titleID = useId();
  const altText = typeof title === "string" ? title : titleID;
  return (
    <li className={cn(s.container__item, "card")} onClick={onClick}>
      <div className={s.card_item}>
        <Link to={`/product/${id}`}>
          <img
            className={s.card_item__img}
            src={image}
            alt={altText}
            aria-labelledby={altText}
            width="394"
            height="360"
          />
        </Link>
        <div className={s.card_item__description}>
          {division && <p className={s.card_item__division}>{division}</p>}
          <h3 className={s.card_item__title} id={altText}>
            {title}
          </h3>
          <h5 className={s.card_item__subtitle}>{subtitle}</h5>
          {content}
        </div>
      </div>
    </li>
  );
};
