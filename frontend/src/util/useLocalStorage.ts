import {useEffect, useState} from "react";

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void;

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
