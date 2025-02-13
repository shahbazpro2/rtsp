import { atom, useAtom } from "jotai";
import React from "react";

const getApiCache = (key, atomName) =>
  atom((get) => {
    if (Array.isArray(key)) {
      let objs = {};
      key.forEach((k) => {
        objs[k] = get(atomName)[k];
      });
      return objs;
    }
    return get(atomName)[key || ""];
  });

export const useJotaiAtom = (keys, atomName) => {
  const [cacheval] = useAtom(
    React.useMemo(() => getApiCache(keys, atomName), [])
  );

  return cacheval;
};
