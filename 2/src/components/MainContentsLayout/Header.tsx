import {FC, JSX, ReactNode} from "react";

type propsTypes = {
  leftSide : ReactNode | string ,
  rightSide : ReactNode | string | null
}
const Header : FC<propsTypes> = ({leftSide, rightSide}) :JSX.Element => {
  return (
      <div className={`grid grid-cols-2 w-full p-5`}>
        <div className={`grid-cols-1 text-4xl flex items-center`}>
          {leftSide}
        </div>
        <div className={`grid grid-cols-1`}>
          {rightSide}
        </div>
      </div>
  )
}

export default Header