import cntl from "cntl";
import { createElement, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode,
  tag?: string | 'a' | 'button';
  loading?: boolean;
  disabled?: boolean;
}

const buttonCN = ({ loading, disabled }: { loading?: boolean; disabled?: boolean }) => cntl`
  app-button
  text-white
  font-bold
  py-2
  px-4
  rounded-lg
  shadow-lg
  focus:outline-none
  focus:shadow-outline
  
  ${loading && `app-button--loading`}

  ${disabled  || loading
    ? cntl`
        bg-gray-300
        pointer-events-none
      `
    : cntl`
      bg-primary-500
      hover:bg-primary-700
    `
  }
`;

export function Button({ children, tag = 'button', loading, disabled, ...others }: ButtonProps) {
  return createElement(tag, { className: buttonCN({ loading, disabled }), ...others }, children);
}