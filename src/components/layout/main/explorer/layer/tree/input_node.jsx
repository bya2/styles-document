import { ExplorerContext } from "context/explorer";
import React, { useContext, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { g_state__user } from "recoil/atoms";
import { fn_logic__POST__exp__add_doc, fn_logic__POST__exp__add_group } from "logic/api/post";
import CompRefInput from "components/reusable/_ref_input";

export default function CompInputNode({ prop__node_id, prop__input_type, prop__node_children }) {
  const { ref__n_doc_input, ref__n_fold_input } = useContext(ExplorerContext);

  const is_exist__ref_current = ref__n_doc_input.current !== null && ref__n_fold_input !== null;
  const is_folder__type__bool = prop__input_type === "folder";

  // State
  const [g_state__user__obj, set_g_state__user__obj] = useRecoilState(g_state__user);
  const [state__input_value__str, set_state__input_value__str] = useState("");

  // Cache
  const memo__node_name_by_type__obj = useMemo(() => {
    return prop__node_children.reduce(
      (obj, node__obj) => {
        if (node__obj.type === "folder") {
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

  const fn_valid__input_val__bool = (e_tg_val__curr) => {
    const is_no__input_val__bool = e_tg_val__curr === "" || e_tg_val__curr.length === 0;
    let is_duplicated_name__bool;
    if (is_folder__type__bool) {
      is_duplicated_name__bool = memo__node_name_by_type__obj.folder.includes(e_tg_val__curr);
    } else {
      is_duplicated_name__bool = memo__node_name_by_type__obj.document.includes(e_tg_val__curr);
    }

    if (is_no__input_val__bool) {
      console.log(1);
      return false;
    }
    if (is_duplicated_name__bool) {
      console.log(2);
      return false;
    }

    return true;
  };

  const fn_set__add__node = (e_tg__curr) => {
    const e_tg_val__curr = e_tg__curr.value;

    const req_data__obj_params = {
      type: prop__input_type,
      name: e_tg_val__curr,
      parent: prop__node_id,
      writer: g_state__user__obj.ref_user_id,
    };

    if (is_folder__type__bool) {
      fn_logic__POST__exp__add_group(req_data__obj_params)
        .then((res_data__obj) => {})
        .catch((err) => {});
    } else {
      fn_logic__POST__exp__add_doc(req_data__obj_params)
        .then((res_data__obj) => {})
        .catch(() => {});
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
    if (e.keyCode) {
      const e_key = e.keyCode || e.key;
      const is_enter__key__bool = e_key === 13;
      console.log(is_enter__key__bool);
      if (!is_enter__key__bool) return;
    }

    // common:
    // - input value state length !== 0 (curr) && !duplicated node name (context) -> warning
    //    - input type
    // - request (import)
    // - change explorer nodes state (context)
    // - init input value state (curr)
    const is_valid__input_val__bool = fn_valid__input_val__bool(e_tg_val__curr);
    if (!is_valid__input_val__bool) return;

    fn_set__add__node(e_tg__curr);

    set_state__input_value__str("");
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
