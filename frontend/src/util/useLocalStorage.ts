import {useEffect, useState} from "react";
import {SetValue} from "../types/types.ts";


export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
   const [value, setValue] = useState<T>(() => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
   })
   useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
   }, [key, value])
   return [value, setValue];
}
