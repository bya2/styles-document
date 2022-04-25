const pad = (_num: number, _len: number) => {
  let str = "" + _num;
  while (str.length < _len) {
    str = "0" + str;
  }
  return str;
};

export const fn_get__curr_date__str = (): string => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const MM = pad(now.getMonth() + 1, 2);
  const dd = pad(now.getDate(), 2);
  const hh = pad(now.getHours(), 2);
  const mm = pad(now.getMinutes(), 2);
  const ss = pad(now.getSeconds(), 2);
  const date = `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
  return date;
};