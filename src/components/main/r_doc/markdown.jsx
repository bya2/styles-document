import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import "../../../styles/main/r_doc/markdown.scss";

const STR__CLS_COMPOENENT = "markdown";
const STR__CLS_ROUTE = "r_doc";

const DocMarkdown = () => {
  const [state__row_num, set_state__row_num] = useState(5);

  return (
    <div className={`wrapper_${STR__CLS_COMPOENENT} ${STR__CLS_ROUTE}`}>
      <div className={"top_bar"}>Bya2</div>
      <textarea name="" placeholder="Write..."></textarea>
    </div>
  );
};

export default DocMarkdown;
