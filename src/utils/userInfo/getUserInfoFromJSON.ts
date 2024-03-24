export const getLocalStorageValue = () => {
  if (typeof window === "undefined") {
    return [];
  }
  const rawLSValue = localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_KEY!);
  const localStorageValue = JSON.parse(rawLSValue!) || [];
  return localStorageValue;
};
