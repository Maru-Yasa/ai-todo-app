import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getQueryParamValue = (url: string, paramName: string) => {
  const searchParams = new URLSearchParams(new URL(url).search);
  return searchParams.get(paramName);
};