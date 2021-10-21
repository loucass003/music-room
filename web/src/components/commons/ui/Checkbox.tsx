import cntl from "cntl";
import { forwardRef } from "react";

interface CheckboxProps extends React.ComponentPropsWithRef<'input'>  {
  error?: string;
  label: string;
  disabled?: boolean;
}

const checkboxCN = ({ hasError, disabled }: { hasError: boolean, disabled?: boolean }) => cntl`
  form-checkbox 
  h-5 
  w-5 
  text-primary-500 
  focus:ring-primary-400
  border-gray-300
  
  ${disabled 
    ? cntl`
      pointer-events-none
      cursor-not-allowed
      bg-gray-200
    `
    : cntl`
    bg-white
    `
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
  ml-2
`

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ error, label, disabled, ...others }: CheckboxProps, ref) => {
  return (
    <div className="w-full">
      {/* <input ref={ref} {...others} className={inputCN({ hasError: !!error, disabled })}></input> */}
      <div className="inline-flex items-center">
        <input ref={ref} {...others} type="checkbox" className={checkboxCN({ hasError: !!error, disabled })} /><span className={inputLabelCN}>{label}</span>
      </div>
      {error && <div className={inputErrorCN}>{error}</div>}
    </div>
  );
});