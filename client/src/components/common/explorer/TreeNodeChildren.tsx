import styles from "@styles-components/Explorer.module.scss";
import { useAppSelector } from "@/store/hooks";
import SubTreeBar from "./SubTreeBar";
import TreeInputNode from "./TreeInputNode";
import Site from "@/components/reusable/area/Site";
import type { I_exp_node } from "@/models/explorer";
import { NODE_TYPE__DOCUMENT, NODE_TYPE__FOLDER } from "@/config/common";

interface I_props {
  prop__r_node_uid: string;
  prop__p_node_uid: string;
  prop__node_children: I_exp_node[];
}

export default function TreeNodeChildren({ prop__r_node_uid, prop__p_node_uid, prop__node_children }: I_props) {
  const s__is_fold_f_node = useAppSelector((s) => s.explorer.nodes.is_fold__cond_map[prop__p_node_uid]);

  return (
    <Site cssModule={styles} className={`${styles.node_children} ${s__is_fold_f_node ? styles.s__fold : styles.s__unfold}`}>
      <TreeInputNode
        prop__r_node_uid={prop__r_node_uid}
        prop__p_node_uid={prop__p_node_uid}
        prop__node_type={NODE_TYPE__FOLDER}
        prop__node_children={prop__node_children}
      />

      <SubTreeBar prop__children={prop__node_children} />

      <TreeInputNode
        prop__r_node_uid={prop__r_node_uid}
        prop__p_node_uid={prop__p_node_uid}
        prop__node_type={NODE_TYPE__DOCUMENT}
        prop__node_children={prop__node_children}
      />
    </Site>
  );
}
