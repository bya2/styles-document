import "../styles/main/r_document/index.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Markdown from "../components/main/r_document/markdown";

const tmp_str_markdown = `# okok
sdfjkdalsjfkldsajfklds
`;

const common_class_name = "r_doc";

const RouteDocument = () => {
  return (
    <>
      <main className={common_class_name}>
        <Markdown />
      </main>
    </>
  );
};

export default RouteDocument;
