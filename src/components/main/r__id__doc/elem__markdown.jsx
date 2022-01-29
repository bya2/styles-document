import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
// import remarkGithub from "remark-github"; //tmp

import "../../../styles/main/r__id__doc/markdown.scss";

const ElemMarkdown = ({ editor_txta__str_value }) => {
  return (
    <ReactMarkdown
      children={editor_txta__str_value}
      remarkPlugins={[remarkGfm]}
    />
  );
};

export default ElemMarkdown;
