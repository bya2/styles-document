import "../styles/main/r_doc/index.scss";
import DocPalette from "../components/main/r_doc/palette";
import DocTypography from "../components/main/r_doc/typography";
import DocMarkdown from "../components/main/r_doc/markdown";
import DocSelector from "../components/main/r_doc/selector";
import DocActivityBar from "../components/main/r_doc/activity_bar";
import DocSideBar from "../components/main/r_doc/side_bar";
import DocToolBar from "../components/main/r_doc/tool_bar";

// Class Name
const curr_route = "r_doc";
const wrapper_article = "wrapper_article";
const editor_area = "editor_area";

const RouteDocument = () => {
  return (
    <>
      <main className={curr_route}>
        <aside>
          <DocActivityBar />
          <DocSideBar />
        </aside>
        <section>
          <DocToolBar />
          <div className={wrapper_article}>
            <article>
              <div className={editor_area}>
                <DocPalette />
                <DocTypography />
                <DocMarkdown />
              </div>
              <DocSelector />
            </article>
          </div>
        </section>
      </main>
    </>
  );
};

export default RouteDocument;
