import { ExplorerContext } from "context/explorer";
import React, { useContext, useMemo, useState } from "react";
import CompRefInput from "components/reusable/_ref_input";

export default function CompInputNode({ prop__input_type, prop__node_children }) {
  const { ref__n_doc_input, ref__n_fold_input } = useContext(ExplorerContext);

  const is_exist__ref_current = ref__n_doc_input.current !== null && ref__n_fold_input !== null;
  const is_folder__type__bool = prop__input_type === "folder";

  // State
  const [state__input_value__str, set_state__input_value__str] = useState("");

  // Cache
  const memo__node_name_by_type__obj = useMemo(() => {
    return prop__node_children.reduce(
      (obj, node__obj) => {
        if (node__obj.type === "group") {
          obj.folder = [...obj.folder, node__obj.name];
        } else {
          obj.document = [...obj.document, node__obj.name];
        }
        return obj;
      },
      { folder: [], document: [] }
    );
  }, [prop__node_children]);

  // Logic
  const fn_logic__assign_ref = (el) => {
    if (is_folder__type__bool) {
      ref__n_fold_input.current = el;
    } else {
      ref__n_doc_input.current = el;
    }
  };

  // Event
  const fn_handle__change__input_value = (e) => {
    const e_tg_val__curr = e.currentTarget.value;
    set_state__input_value__str(e_tg_val__curr);
    console.log(state__input_value__str);
  };

  const fn_handle__key_down_and_blur__input_node = (e) => {
    const e_tg__curr = e.currentTarget;
    const e_tg_val__curr = e_tg__curr.value;

    // key down:
    // - press enter key
    if (e instanceof KeyboardEvent) {
      const e_key = e.key || e.keyCode;
      const is_enter__key__bool = e_key === 13;
      if (!is_enter__key__bool) return;
    }

    // common:
    // - input value state length !== 0 (curr) && !duplicated node name (context) -> warning
    //    - input type
    // - request (import)
    // - change explorer nodes state (context)
    // - init input value state (curr)

    const is_no__input_val__bool = e_tg_val__curr === "" || e_tg_val__curr.length === 0;
    let is_duplicated_name__bool;
    if (is_folder__type__bool) {
      is_duplicated_name__bool = memo__node_name_by_type__obj.folder.includes(e_tg_val__curr);
    } else {
      is_duplicated_name__bool = memo__node_name_by_type__obj.document.includes(e_tg_val__curr);
    }

    console.log(prop__node_children, memo__node_name_by_type__obj);

    if (is_no__input_val__bool) {
      console.log(1);
    }
    if (is_duplicated_name__bool) {
      console.log(2);
    }
  };

  return is_exist__ref_current ? (
    <li className="comp item input" onClick={(e) => e.stopPropagation()}>
      <div className="comp exp-l-sub-tree outer">
        <span className="inner">
          <div className="area node">
            <span className="group desc">
              <div className="icon-box type">
                <i className={`icon ${1}`}>{is_folder__type__bool ? "F" : "D"}</i>
              </div>
              <div className="content-box">
                <CompRefInput
                  type="text"
                  name={is_folder__type__bool ? "new folder" : "new document"}
                  value={state__input_value__str}
                  onChange={(e) => {
                    fn_handle__change__input_value(e);
                    e.stopPropagation();
                  }}
                  onKeyDown={(e) => {
                    fn_handle__key_down_and_blur__input_node(e);
                    e.stopPropagation();
                  }}
                  onBlur={(e) => {
                    fn_handle__key_down_and_blur__input_node(e);
                    e.stopPropagation();
                  }}
                  ref={(el) => fn_logic__assign_ref(el)}
                />
              </div>
            </span>
          </div>
        </span>
      </div>
    </li>
  ) : null;
}
