import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import "../../../styles/main/r_document/markdown.scss";

const Markdown = () => {
  const cls_component = "markdown";
  const cls_route = "r_doc";

  const [num_row_size, set_num_row_size] = useState(5);

  return (
    <div className={`wrapper_${cls_component} ${cls_route}`}>
      <div className={"top_bar"}>Bya2</div>
      <textarea name="" placeholder="Write..."></textarea>
    </div>
  );
};

export default Markdown;
