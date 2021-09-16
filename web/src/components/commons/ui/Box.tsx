import cntl from "cntl";

interface BoxProps {
  insideSpacing?: boolean | 'p-3' | 'p-5'
}

type BoxComponentProps = BoxProps & React.HTMLAttributes<HTMLDivElement>;


const boxCN = ({ insideSpacing, className }: BoxComponentProps) => cntl`
  bg-white
  rounded-lg
  shadow-lg
  ${className}

  ${insideSpacing === true ? 'p-5' : !!insideSpacing && insideSpacing}
`

export function Box(props: BoxComponentProps) {
  return (
    <div className={boxCN(props)}>
      {props.children}
    </div>
  )
}