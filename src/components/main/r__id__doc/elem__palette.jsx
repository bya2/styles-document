import "../../../styles/main/r__id__doc/palette.scss";
import { fn_logic__clipboard_copy } from "../../../logic/clipboard";

const fn_handler__on_click__palette = (e) => {
  const e_curr_tg = e.currentTarget;
  fn_logic__clipboard_copy(e_curr_tg.children[1]);
};

const ElemPalette = ({ editor_txta__str_value }) => {
  const arr_editor_elems = editor_txta__str_value.split(/[\s]+/);

  return (
    <>
      {arr_editor_elems.map((elem, i) => (
        <div
          className={"palette_card"}
          key={`palette${i}`}
          onClick={fn_handler__on_click__palette}
        >
          <div className="palette_box" style={{ background: `${elem}` }} />
          <p className="palette_txt">{elem}</p>
        </div>
      ))}
    </>
    // <article className="comp_palette outer">
    //   <div className="inner">
    //     <>
    //       {arr_editor_elems.map((elem, i) => (
    //         <div
    //           key={`palette${i}`}
    //           className="palette_wrapper"
    //           onClick={fn_handler__on_click__palette}
    //         >
    //           <div
    //             className="palette_box"
    //             style={{
    //               backgroundColor: `${elem}`,
    //             }}
    //           />
    //           <p className="palette_txt">{elem}</p>
    //         </div>
    //       ))}
    //     </>
    //   </div>
    // </article>
  );
};

export default ElemPalette;
