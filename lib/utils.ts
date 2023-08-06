import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getQueryParamValue = (url: string, paramName: string) => {
  const searchParams = new URLSearchParams(new URL(url).search);
  return searchParams.get(paramName);
};

export const generateUUID = () => {
  'use client'
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const parseResponseTodos = (raw: string) => {
  'use client'
  const raw_todos = raw.split('|')
  let todos: Array<Todos> = []
  raw_todos.map((t) => {
    todos.push({
      todo: t,
      status: 'todo'
    })
  })
  return todos
}

export const deleteArrayObjectLocalStorage = (key: string, objKey: string, filter: Array<string>) => {
  'use client'
  let data = JSON.parse(localStorage.getItem(key) as string)
  if (!data) {
    return;
  }
  data = data.filter((e: any) => !filter.includes(e[objKey]))
  localStorage.setItem(key, JSON.stringify(data))
}

export const pushToLocalStorage = (key: string, obj: any) => {
  'use client'
  let data = JSON.parse(localStorage.getItem(key) as string)
  if (!data) {
    data = []
  }
  data.push(obj)
  localStorage.setItem(key, JSON.stringify(data))
}