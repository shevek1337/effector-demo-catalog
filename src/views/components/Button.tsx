import React, { ReactElement, ReactNode } from "react"

type Props = {
  readonly className?: string
  readonly children: ReactNode
  readonly type?: "button" | "submit" | "reset" | undefined
  readonly onClick?: () => void
}

const Button = ({
  className,
  children,
  type = "button",
  onClick,
}: Props): ReactElement => {
  const allClassNames = [
    "p-2 bg-gray-200 rounded hover:bg-gray-300 font-bold ",
    className,
  ].join("")

  return (
    <button className={allClassNames} onClick={onClick} type={type}>
      {children}
    </button>
  )
}

export default Button
