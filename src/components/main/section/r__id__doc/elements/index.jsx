import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../../../../../styles/main/section/r__id__doc/elements/index.scss";
import { fn_logic__GET__doc__elem_list } from "../../../../../logic/api/get";
import Palette from "./palette";
import Typography from "./typography";
import Markdown from "./markdown";
import Selector from "../selector";

const Comp_doc_elements = () => {
  /**
   * Parameter
   */
  const obj_params = useParams();
  // const { id: param__id, doc: param__doc } = obj_params;

  /**
   * State
   */
  const [state__list__arr_elems, set_state__list__arr_elems] = useState([]);

  /**
   * Setter
   */

  /**
   * Sub
   */
  const fn_sub__comp__for_type = (_obj_elem) => {
    const { type, value: ta__str_value } = _obj_elem;

    console.log("TA:", ta__str_value);

    switch (type) {
      case "palette":
        return <Palette ta__str_value={ta__str_value} />;
      case "typography":
        const { styles: typo__obj_styles } = _obj_elem;
        return (
          <Typography
            typo__obj_styles={typo__obj_styles}
            ta__str_value={ta__str_value}
          />
        );
      case "markdown":
        return <Markdown ta__str_value={ta__str_value} />;
      default:
        return null;
    }
  };

  /**
   * Side
   */
  const fn_side__mount__load_elems = () => {
    console.log("mount");
    fn_logic__GET__doc__elem_list(obj_params)
      .then((obj_res_data) => {
        const { code, data: list__arr_elems } = obj_res_data;

        switch (code) {
          case 200:
            set_state__list__arr_elems(list__arr_elems);
            break;
          case 404:
            set_state__list__arr_elems([]);
            break;
          default:
            set_state__list__arr_elems([]);
        }
      })
      .catch((err) => {
        console.log("ERR:\nLOC: fn_side__mount__load_elems");
        console.error(err);
      });
  };

  useEffect(fn_side__mount__load_elems, [obj_params]);

  /**
   * Handler
   */
  const fn_handler__d_click__elem = (e) => {
    const e_curr_tg = e.currentTarget;
    const e_curr_tg_name = e_curr_tg.getAttribute("name");
  };

  return (
    <>
      <ul className="comp_doc_elements a-col ul-no-space">
        <>
          {state__list__arr_elems.map((obj_elem, i) => {
            const { _id: key, type } = obj_elem;
            return (
              <li
                key={key}
                className="row li-no-style"
                name={`${type}${i}`}
                onDoubleClick={(e) => fn_handler__d_click__elem(e)}
              >
                {fn_sub__comp__for_type(obj_elem)}
              </li>
            );
          })}
        </>
      </ul>
      <Selector
        state__list__arr_elems={state__list__arr_elems}
        set_state__list__arr_elems={set_state__list__arr_elems}
      />
    </>
  );
};

export default Comp_doc_elements;
