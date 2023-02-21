import React, { useId } from 'react'
import s from './Card.module.scss'
import cn from 'classnames'

export type CardProps = {
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
  division?: ReactNode
};

export const Card: FC<CardProps> = (props) => {
  const { image, title, subtitle, content, onClick, division } = props
  const titleID = useId()
  const altText = typeof title === 'string' ? title : titleID
  return (
    <li className={cn(s.container__item, 'card')} onClick={onClick}>
      <div className={s.card_item}>
        <img className={s.card_item__img} src={image} alt={altText} aria-labelledby={altText} width="394"
             height="360"/>
        {division && <p className={s.card_item__division}>{division}</p>}
        <h3 className={s.card_item__title} id={altText}>{title}</h3>
        <h5 className={s.card_item__subtitle}>{subtitle}</h5>
        {content}
      </div>
    </li>
  )
}
