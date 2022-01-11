import "../styles/main/r_doc/index.scss";
import DocMarkdown from "../components/main/r_doc/markdown";
import DocSelector from "../components/main/r_doc/selector";

const tmp_str_markdown = `# okok
sdfjkdalsjfkldsajfklds
`;

const common_class_name = "r_doc";

const RouteDocument = () => {
  return (
    <>
      <main className={common_class_name}>
        <div className={`wrapper_top_menu`}>
          <div>A</div>
          <div>B</div>
          <div>C</div>
        </div>
        <div>
          <DocMarkdown />
          <DocSelector />
        </div>
      </main>
    </>
  );
};

export default RouteDocument;
