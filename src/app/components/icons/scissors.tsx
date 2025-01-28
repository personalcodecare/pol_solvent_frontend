import * as React from 'react'

function ScissorsIcon(
  props: React.JSX.IntrinsicAttributes &
    React.SVGProps<SVGSVGElement> & { shadow?: string },
) {
  const shadowFilter = props.shadow ? props.shadow : 'none'
  return (
    <svg
      width={props.width ?? 84}
      height={props.height ?? 84}
      viewBox="0 0 84 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ filter: shadowFilter }}
      {...props}
    >
      <path
        fill="url(#pattern0_87_52)"
        d="M0.666992 0H84.666992V84H0.666992z"
      />
      <defs>
        <pattern
          id="pattern0_87_52"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use xlinkHref="#image0_87_52" transform="scale(.004)" />
        </pattern>
        <image
          id="image0_87_52"
          width={250}
          height={250}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAYAAACI7Fo9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAD60lEQVR4nO3cQW7bMABFQbPocePT5MDqMl10YbqgRPnNHCBgBDxw4Q+O4zgewGf7dfUBgPWEDgFChwChQ4DQIUDoEPD76gP8jzHG1UdY5vj+Xva753g+P/bD7fLddvvZ2o0OAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUPArbfudzOzw165R9/lHK/a5byTO/rLv9vf3OgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAV6BPdHMC6WTL45O/e1V59jhxVj+zY0OAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAE1guYVp7Ljc6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0CTGBJWzXFPb6+3jvQIm50CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoEmMBuavbl01VTzqnZ58QZOJcbHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOASawJzIR/TE78X3V7DdedY7duNEhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAjIbN132Jmv3FXv8P+xLzc6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0Cbj2BnZl97vK88CerPJ18R250CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFCh4BbvwLLe7xc2+NGhwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgAls0Hg+x9Vn2MXMHPjO382NDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHgMwEdtXLpzOzSK+vchU3OgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAZmt+w5P9e5whsdjj839Lt+iwo0OAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQoeAzASWH+anPW50CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoEmMDyUWZfuK3Mgd3oECB0CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIMIFlezOz1sqkdZYbHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAbeewM7MHc0oKXOjQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAh4NYTWO7LJPlcbnQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgSM43h5ibidMdYsI2fmmbzn02etu3XlRocAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIeDWW3fgNW50CBA6BAgdAoQOAUKHAKFDgNAh4A9G24ZVx3gvNwAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  )
}

export default ScissorsIcon
