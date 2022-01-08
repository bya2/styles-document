import "../styles/main/r_document/index.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const tmp_str_markdown = `# okok
sdfjkdalsjfkldsajfklds
`;

const common_class_name = "r_doc";

const RouteDocument = () => {
  return (
    <>
      <main className={common_class_name}>
        <div>A</div>
        <ReactMarkdown children={tmp_str_markdown}></ReactMarkdown>
        <textarea name="" cols="30" rows="10" />
      </main>
    </>
  );
};

export default RouteDocument;
