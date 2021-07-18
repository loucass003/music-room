import cntl from "cntl";
import { createElement, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode,
  tag?: string | 'a' | 'button';
}

const buttonCN = cntl`
  bg-primary-500
  hover:bg-primary-700
  text-white
  font-bold
  py-2
  px-4
  rounded-lg
  shadow-lg
  focus:outline-none
  focus:shadow-outline
`;

export function Button({ children, tag = 'button', ...others }: ButtonProps) {
  return createElement(tag, { className: buttonCN, ...others }, children);
}