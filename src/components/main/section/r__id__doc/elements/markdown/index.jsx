import "../../../../../../styles/main/section/r__id__doc/elements/markdown/index.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

const Comp_markdown = ({ ta__str_value }) => {
  return (
    <div className="comp_markdown">
      <ReactMarkdown children={ta__str_value} remarkPlugins={[remarkGfm]} />
    </div>
  );
};

export default Comp_markdown;
