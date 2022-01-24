import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import remarkGithub from "remark-github"; //tmp

import "../../../styles/main/r__id__doc/markdown.scss";

const DocMarkdown = ({ editor_txta__str_value }) => {
  return (
    <article className="comp_markdown outer">
      <div className="inner">
        <ReactMarkdown
          children={editor_txta__str_value}
          remarkPlugins={[remarkGfm]}
        />
      </div>
    </article>
  );
};

export default DocMarkdown;
