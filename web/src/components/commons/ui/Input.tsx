import cntl from "cntl";
import { forwardRef } from "react";

interface InputProps extends React.ComponentPropsWithRef<'input'>  {
  error?: string;
  label?: string;
}

const inputCN = ({ hasError }: { hasError: boolean }) => cntl`
  border-2 
  bg-white
  h-10 
  px-2
  rounded-lg
  w-full
  text-sm 
  focus:outline-none
  ${hasError
    ? cntl`border-red-500`
    : cntl`border-gray-300` 
  }
`;

const inputErrorCN = cntl`
  text-xs 
  text-red-500 
  my-1
`

const inputLabelCN = cntl`
  text-sm
  text-black 
  my-1
`

export const Input = forwardRef<HTMLInputElement, InputProps>(({ error, label, ...others }: InputProps, ref) => {
  return (
    <div className="appInput w-full">
      <div className={inputLabelCN}>{label}</div>
      <input ref={ref} {...others} className={inputCN({ hasError: !!error })}></input>
      {error && <div className={inputErrorCN}>{error}</div>}
    </div>
  );
});