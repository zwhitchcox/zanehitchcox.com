import React, { useEffect, useState } from 'react';

const DARK_MODE_KEY = "DARK_MODE_KEY"

function usePersistentState<T = any>(key: string, init: any) {
  const [persistentState, setPersistentState] = useState<T>(() => {
    let item
    if (item = localStorage.getItem(key)) {
      return JSON.parse(item);
    }
    return typeof init === "function" ? init() : init;
  })
  const _setPersistentState = (val: any) => {
    localStorage.setItem(key, JSON.stringify(val));
    setPersistentState(val);
  }
  return [persistentState, _setPersistentState];
}

export function useDarkMode() {
  let [darkMode, setDarkMode] = usePersistentState<Boolean>(DARK_MODE_KEY, () => {
    const hour = (new Date).getHours();
    return hour < 9 || hour > 12 + 6;
  });
  return [darkMode, setDarkMode];
}