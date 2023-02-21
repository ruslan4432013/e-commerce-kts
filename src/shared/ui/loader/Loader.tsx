import React from 'react'
import s from './Loader.module.scss'
import cn from 'classnames'


export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l'
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

export const Loader: FC<LoaderProps> = (props) => {
  const { loading, size = LoaderSize.m, className } = props

  const isLoad = loading ?? true

  return (isLoad ?
      <div
        className={className}
      >
        <div className={cn(s.loader, {
          [s.small]: size === LoaderSize.s,
          [s.medium]: size === LoaderSize.m,
          [s.large]: size === LoaderSize.l,
        })}/>
      </div> : null
  )
}
