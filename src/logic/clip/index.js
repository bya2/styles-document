import { ERR_MSG__COPY } from "../../config/clip/message";

export const fn_logic__clip__selection_copy = (_node__to_copy) => {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(_node__to_copy);
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    document.execCommand("copy");
    selection.removeAllRanges();
  } catch (err) {
    console.error(`${ERR_MSG__COPY}${err.message}`);
  }
};
