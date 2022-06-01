import { useState, useCallback } from "react";

export default function useMap<K, V>(_map?: Map<K, V>) {
  const [map, setMap] = useState<Map<K, V>>(_map ?? new Map());

  const addMap = useCallback((_key: K, _value: V) => {
    setMap((prev) => {
      return new Map([...prev, [_key, _value]]);
    });
  }, []);

  const upsertMap = useCallback((_key: K, _value: V) => {
    setMap((prev) => {
      return new Map(prev).set(_key, _value);
    });
  }, []);

  const removeMap = useCallback((_key: K) => {
    setMap((prev) => {
      const tmpMap = new Map(prev);
      tmpMap.delete(_key);
      return tmpMap;
    });
  }, []);

  const clearMap = useCallback(() => {
    setMap((prev) => {
      const tmpMap = new Map(prev);
      tmpMap.clear();
      return tmpMap;
    });
  }, []);

  return [map, { setMap, addMap, upsertMap, removeMap, clearMap }];
}
