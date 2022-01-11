import "../styles/main/r_doc/index.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import DocMarkdown from "../components/main/r_doc/markdown";
import DocMenu from "../components/main/r_doc/menu";

const tmp_str_markdown = `# okok
sdfjkdalsjfkldsajfklds
`;

const common_class_name = "r_doc";

const RouteDocument = () => {
  return (
    <>
      <main className={common_class_name}>
        <DocMarkdown />
        <DocMenu />
      </main>
    </>
  );
};

export default RouteDocument;
