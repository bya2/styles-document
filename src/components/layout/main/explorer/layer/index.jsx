import { useContext } from "react";

import { ExplorerContext } from "context/explorer";

import CompExpLRoot from "components/layout/main/explorer/layer/root";
import CompExpLTree from "components/layout/main/explorer/layer/tree";

export default function CompExpLayer() {
  const { param_id, cond__is_click__exp_l_root__bool } = useContext(ExplorerContext);

  return (
    <div className={`comp exp-layer outer${cond__is_click__exp_l_root__bool ? " s-click-root" : ""}`}>
      <span name={param_id} className="inner">
        <CompExpLRoot />
        <CompExpLTree />
      </span>
    </div>
  );
}
