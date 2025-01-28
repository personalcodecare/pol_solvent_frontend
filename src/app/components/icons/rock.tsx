import * as React from 'react'

function RockIcon(
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
      <circle cx={42.3335} cy={42} r={42} fill="url(#pattern0_49_360)" />
      <defs>
        <pattern
          id="pattern0_49_360"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use xlinkHref="#image0_49_360" transform="scale(.004)" />
        </pattern>
        <image
          id="image0_49_360"
          width={250}
          height={250}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAYAAACI7Fo9AAAACXBIWXMAAAsTAAALEwEAmpwYAAADsElEQVR4nO3csW0cMQBFwVvDLagEFaH+AxfhElQEHTpxcDyDWlJvpgCBt8IDkw9eY4wH8L39uPsAwHpChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDwM+7D/A/ruu6+whTfv3+HKv+9sf729MfY9U5TjvDrDGW/fuWc6NDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BBw9NZ9xsqd+bNW7rBnft+qc5x2hpXn2I0bHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUdPYE+cXMId3OgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUe/Astrdni5doczlLjRIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAhQOgQYAIb9PH+dt19hl1MTnGP/W5udAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BGQmsKteHZ2Zk3r5lLu40SFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CMhs3Xd44niHMzwee2zud/kWFW50CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoEZCaw/GV+2uNGhwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgAks38rsC7czc+Axbn8892VudAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BJjAsr2ZWasXbv/NjQ4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFCh4CjJ7Azc0czSsrc6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CDh6Asu5TJK/lhsdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4B1xhPLxG3c11rlpEz80xec+Ks9eRW3OgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQcvXUHnuNGhwChQ4DQIUDoECB0CBA6BAgdAoQOAX8AM0lj/5UYmeoAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  )
}

export default RockIcon
