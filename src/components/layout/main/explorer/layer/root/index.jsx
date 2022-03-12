import { useContext } from "react";

import CompExpTool from "components/layout/main/explorer/layer/tool";

import { ExplorerContext } from "context/explorer";

export default function CompExpLRoot() {
  const { ctx__root_name, ctx__fn_handle__click__exp_l_root } = useContext(ExplorerContext);

  return (
    <div name={ctx__root_name} className={"comp exp-l-root outer"} onClick={(e) => ctx__fn_handle__click__exp_l_root(e)}>
      <span
        className="inner"
        onClick={(e) => {
          console.log(1);
        }}
      >
        <span className="group desc">
          <div className="icon-box">
            <i className={`icon ${1}`}>R</i>
          </div>
          <div className="content-box">
            <span>{ctx__root_name}</span>
          </div>
        </span>
        {true ? (
          <span className="group tool">
            <CompExpTool />
          </span>
        ) : null}
      </span>
    </div>
  );
}
