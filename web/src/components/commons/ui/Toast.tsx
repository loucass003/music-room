import cntl from "cntl";
import { AppearanceTypes, ToastProps } from "react-toast-notifications";

const toastMainCN = ({ appearance }: { appearance: AppearanceTypes }) => cntl`
  flex
  items-center
  rounded-lg
  shadow-lg
  py-2
  px-3
  mb-2
  w-60
  
  ${appearance === 'success' && `bg-green-500 border-green-700`}
  ${appearance === 'info' && `bg-blue-400 border-blue-700`}
  ${appearance === 'error' && `bg-red-500 border-red-700`}
  ${appearance === 'warning' && `bg-orange-500 border-orange-700`}

`;

const toastIconCN = ({ appearance }: { appearance: AppearanceTypes }) => cntl`
  rounded-full 
  bg-white 
  mr-3
  
  ${appearance === 'success' && `text-green-500`}
  ${appearance === 'info' && `text-blue-500`}
  ${appearance === 'error' && `text-red-500`}
  ${appearance === 'warning' && `text-orange-500`}

`;


export function Toast({ appearance, children }: ToastProps) {
  return (
    <div className={toastMainCN({ appearance })}>
      <div className={toastIconCN({ appearance })}>
        <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" className="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
        </svg>
      </div>
      <div className="text-white max-w-xs ">
        {children}
      </div>
    </div>
  )
}