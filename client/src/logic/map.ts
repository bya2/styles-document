export interface IHash<V> {
  [key: string]: V;
}

export const getDirFromObjs = <K, V>(_arr: any[], _key: K, _value: V): Map<K, V> => {
  const map = new Map<K, V>();

  const arrLen = _arr.length;
  for (let i = 0; i < arrLen; ++i) {
    map.set(_arr[i][_key], _value);
  }

  return map;
};

export const getDirFromMaps = <K, V>(_arr: any[], _key: K, _value: V): Map<K, V> => {
  const map = new Map<K, V>();

  const arrLen = _arr.length;
  for (let i = 0; i < arrLen; ++i) {
    map.set(_arr[i].get(_key), _value);
  }

  return map;
};

export const getDirFromKeys = <K, V>(_arr: K[], _value: V): Map<K, V> => {
  const map = new Map<K, V>();

  const arrLen = _arr.length;
  for (let i = 0; i < arrLen; ++i) {
    map.set(_arr[i], _value);
  }

  return map;
};
