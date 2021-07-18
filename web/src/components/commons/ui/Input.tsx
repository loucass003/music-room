import cntl from "cntl";

interface InputProps extends React.ComponentPropsWithRef<'input'>  {
  error?: string;
}

const inputCN = ({ hasError }: { hasError: boolean }) => cntl`
  border-2 
  bg-white
  h-10 
  px-5
  pr-16 
  rounded-lg 
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

export function Input({ error, ...others }: InputProps) {
  return (
    <div className="appInput">
      <input {...others} className={inputCN({ hasError: !!error })}></input>
      {error && <div className={inputErrorCN}>{error}</div>}
    </div>
  );
}