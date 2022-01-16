import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import "../../../styles/main/r_doc/markdown.scss";

const STR__CURR_ROUTE = "r_doc";
const STR__COMPOENENT = "markdown";

const DocMarkdown = () => {
  const [state__row_num, set_state__row_num] = useState(5);

  return (
    <div className={`wrapper_${STR__COMPOENENT} ${STR__CURR_ROUTE}`}>
      <div className={"top_bar"}>Bya2</div>
      <textarea name="" placeholder="Write..."></textarea>
      <ReactMarkdown ></ReactMarkdown>
    </div>
  );
};

export default DocMarkdown;
