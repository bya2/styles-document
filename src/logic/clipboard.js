import { ERR_MSG__COPY } from "../config/message";

export const fn_logic__clipboard_copy = (node_to_copy) => {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(node_to_copy);
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    document.execCommand("copy");
    selection.removeAllRanges();
  } catch (err) {
    console.error(`${ERR_MSG__COPY}${err.message}`);
  }
};
