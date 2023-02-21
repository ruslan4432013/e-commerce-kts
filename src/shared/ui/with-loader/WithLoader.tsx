import React from 'react'
import s from './WithLoader.module.scss'
import { Loader, LoaderSize } from '../loader/Loader'


export type WithLoaderProps = PropsWithChildren<{
  loading: boolean;
}>;

export const WithLoader: FC<WithLoaderProps> = ({loading, children}) => {
  return (
    <div className={s.root}>
      {loading && <Loader className={s.loader} size={LoaderSize.s}/>}
      {children}
    </div>
  )
}
