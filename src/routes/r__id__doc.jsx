import { Outlet } from "react-router-dom";

import "../styles/main/r__id__doc/index.scss";
import {} from "../logic/rest";
import DocElements from "../components/main/r__id__doc/elements";
import DocToolBar from "../components/main/r__id__doc/tool_bar";
import DocEditor from "../components/main/r__id__doc/editor";
import DocSelector from "../components/main/r__id__doc/selector";

// tmp
import DocMarkdown from "../components/main/r__id__doc/markdown";
import DocPalette from "../components/main/r__id__doc/palette";

const str_dummy = `
# GFM

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |

## Tasklist

* [ ] to do
* [x] done
`;

const RouteIDDocument = () => {
  return (
    <>
      <section className="r__id__doc">
        <DocElements />

        <DocToolBar />

        <DocSelector />

        <DocPalette
          editor_txta__str_value={`#000\r\n#fcfcfc #fd7891\t#fa6109\n#dfdfdf\t#adadad #d7d #d99 #d99 #111 sssss 101010`}
        />
        <DocMarkdown editor_txta_value={str_dummy} />
      </section>
      <Outlet />
    </>
  );
};

export default RouteIDDocument;
