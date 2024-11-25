import React from 'react'
import { ReactNode } from 'react';


type CardProps = {
   children: React.ReactNode;
   title: string;
};
type FC<T> = (props: T) => ReactNode;

const Card: FC<CardProps> = ({title, children}) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div>{children}</div>
    </div>
  )
}
export default Card;
