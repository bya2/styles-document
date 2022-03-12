import { useContext } from "react";
import { ExplorerContext } from "context/explorer";
import CompExpLRoot from "components/layout/main/explorer/layer/root";
import CompExpLTree from "components/layout/main/explorer/layer/tree";

export default function CompExpLayer() {
  const { layer__key, cond__is_click__exp_l_root__bool } = useContext(ExplorerContext);

  return (
    <div name={layer__key} className={`comp exp-layer outer${cond__is_click__exp_l_root__bool ? " s-click-root" : ""}`}>
      <span className="inner">
        <CompExpLRoot />
        <CompExpLTree />
      </span>
    </div>
  );
}
