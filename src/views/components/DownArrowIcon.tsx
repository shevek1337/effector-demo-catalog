import React, { ReactElement, SVGProps } from "react"

const LightIcon = ({
  className = "h-6",
  ...props
}: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 17l-4 4m0 0l-4-4m4 4V3"
      />
    </svg>
  )
}

export default LightIcon
