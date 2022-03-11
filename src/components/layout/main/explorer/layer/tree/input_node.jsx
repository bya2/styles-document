import { ExplorerContext } from "context/explorer";
import React, { useContext } from "react";
import CompRefInput from "components/reusable/_ref_input";

export default function CompInputNode({ prop__input_type }) {
  const { ref__n_doc_input, ref__n_fold_input } = useContext(ExplorerContext);

  const cond__is_ref_current = true;
  const cond__is_folder__bool = prop__input_type === "folder";

  const fn_logic__assign_ref = (el) => {
    if (cond__is_folder__bool) {
      ref__n_fold_input.current = el;
    } else {
      ref__n_doc_input.current = el;
    }
  };

  return cond__is_ref_current ? (
    <li className="item input" onClick={(e) => e.stopPropagation()}>
      <div className={"comp exp-l-sub-tree outer"}>
        <span className="inner">
          <div className="area node">
            <span className="group desc">
              <div className="icon-box type">
                <i className={`icon ${1}`}>{"F"}</i>
              </div>
              <div className="content-box">
                <CompRefInput
                  type="text"
                  name={cond__is_folder__bool ? "new folder" : "new document"}
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
