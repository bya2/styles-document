import styles from "@styles-components/Explorer.module.scss";
import { useAppSelector } from "@/store/hooks";
import SubTreeBar from "./SubTreeBar";
import TreeInputNode from "./TreeInputNode";
import Site from "@/components/reusable/area/Site";
import type { expNode } from "@/models/explorer";
import { NODE_TYPE__DOCUMENT, NODE_TYPE__FOLDER } from "@/config/common";

interface Props {
  prop__p_node_id: string;
  prop__node_children: expNode[];
}

export default function TreeNodeChildren({ prop__p_node_id, prop__node_children }: Props): JSX.Element {
  const s__is_fold_f_node = useAppSelector((s) => s.explorer.nodes.is_fold_f_node__map[prop__p_node_id]);

  return (
    <Site cssModule={styles} className={`${styles.node_children} ${s__is_fold_f_node ? styles.s__fold : styles.s__unfold}`}>
      <TreeInputNode
        prop__p_node_id={prop__p_node_id}
        prop__node_type={NODE_TYPE__FOLDER}
        prop__node_children={prop__node_children}
      />

      <SubTreeBar prop__children={prop__node_children} />
      
      <TreeInputNode
        prop__p_node_id={prop__p_node_id}
        prop__node_type={NODE_TYPE__DOCUMENT}
        prop__node_children={prop__node_children}
      />
    </Site>
  );
}
