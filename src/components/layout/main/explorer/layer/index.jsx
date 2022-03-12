import { useContext } from "react";
import { ExplorerContext } from "context/explorer";
import CompExpLRoot from "components/layout/main/explorer/layer/root";
import CompExpLTree from "components/layout/main/explorer/layer/tree";

export default function CompExpLayer() {
  const { ctx__root_key, ctx__cond__is_click__root__bool } = useContext(ExplorerContext);

  return (
    <div name={ctx__root_key} className={`comp exp-layer outer${ctx__cond__is_click__root__bool ? " s-click-root" : ""}`}>
      <span className="inner">
        <CompExpLRoot />
        <CompExpLTree />
      </span>
    </div>
  );
}
