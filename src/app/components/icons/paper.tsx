import * as React from 'react'

function PaperIcon(
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
      <path fill="url(#pattern0_87_33)" d="M0 0H84V84H0z" />
      <defs>
        <pattern
          id="pattern0_87_33"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use xlinkHref="#image0_87_33" transform="scale(.004)" />
        </pattern>
        <image
          id="image0_87_33"
          width={250}
          height={250}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAYAAACI7Fo9AAAACXBIWXMAAAsTAAALEwEAmpwYAAADzklEQVR4nO3cMVIbQRRFUY+LDC3C7H9ReBEiHmdGAYFGqFG37jk51Ah06yevZtv3/Rfw3H4/+gGA8YQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgEvj36A79i27dGPsKTz+X3I+8NOpzf/kIlcvibORYcAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ8DSE9jVjJqeHjVqqjrD5zPD/ZqLDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHABPYbzoy+xw5z5xhfnrELDPcymTWRYcAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ0BmArvaRBTuyUWHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUPA0hPYGd7AalrLClx0CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAh4OXRDwDP6Hx+30f83tPpbbvl51x0CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoEbPs+ZKn3Iz4+/l798LdOB1nLqOnpUaO+b0c+3+vrn//P4KJDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CHAW2B5iNnekvrsXHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgSYwHI3R2atpqqfRv3dLt/w7KJDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BBg687d2K9/mm3376JDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CHABBauNNus9QgXHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOASawPJUjM9WjZpu1HuGiQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAhwASW6a389tVZuOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAhYegJ7ZO5oRkmZiw4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFCh4ClJ7CsyyT5Z7noECB0CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQI2Pb96iXidLZtzDLyyDyT25i1jnfZtosOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUPA0lt34DouOgQIHQKEDgFChwChQ4DQIUDoEPAPycBy/lfvcEQAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  )
}

export default PaperIcon
