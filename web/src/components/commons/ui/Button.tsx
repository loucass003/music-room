import cntl from "cntl";
import { createElement, forwardRef, ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: ReactNode,
  tag?: string | 'a' | 'button';
  text?: boolean;
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
  to?: string;
}

const buttonCN = ({ loading, disabled, text, block }: { loading?: boolean; disabled?: boolean, text?: boolean, block?: boolean }) => cntl`
  app-button
  font-bold
  py-2
  px-4
  text-center

  ${block && 'w-full block'}
  
  
  
  focus:outline-none
  focus:shadow-outline
  ${text
    ? cntl`
        hover:bg-gray-300
        rounded-lg

        ${disabled
          ? cntl`
              text-gray-50
              pointer-events-none
              cursor-not-allowed
            `
          : cntl`
            hover:bg-gray-50
            `
        }
      `
    : cntl`
      text-white
        rounded-lg
        shadow-lg
        ${loading && `app-button--loading`}

        ${disabled || loading
          ? cntl`
              bg-gray-300
              pointer-events-none
              cursor-not-allowed
            `
          : cntl`
              bg-primary-500
              hover:bg-primary-700
            `
        }
      `
  }

  
`;

export const Button = forwardRef<HTMLElement, ButtonProps>(({ children, tag = 'button', text, loading, disabled, block, to, ...others }: ButtonProps, ref) => 
  createElement(
    to ? 'div' : tag, 
    { className: buttonCN({ loading, disabled, text, block }), ref, ...others }, 
    to 
      ? <Link to={to}>{children}</Link> 
      : children
  )
);