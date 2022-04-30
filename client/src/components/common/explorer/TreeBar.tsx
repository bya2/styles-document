import styles from "@styles-components/Explorer.module.scss";
import { useAppSelector } from "@/store/hooks";
import UList from "@/components/reusable/bar/UList";
import Item from "@/components/reusable/group/Item";
import TreeNode from "@/components/common/explorer/TreeNode";
import TreeNodeChildren from "@/components/common/explorer/TreeNodeChildren";
import { I_exp_r_node } from "@/models/explorer";
import { ROOT_TYPE } from "@/config/explorer";

export default function TreeBar() {
  const s__exp_trees__arr = useAppSelector((s) => s.explorer.trees.arr);

  return (
    <UList cssModule={styles} className={`${styles.trees}`} tabIndex={0}>
      {s__exp_trees__arr.map((tree__obj: I_exp_r_node) => {
        const { uid, children } = tree__obj;

        return (
          <Item key={uid} prop__id={uid} cssModule={styles} className={styles.tree}>
            <TreeNode prop__node_uid={uid} prop__node_name={uid} prop__node_type={ROOT_TYPE} />
            <TreeNodeChildren prop__r_node_uid={uid} prop__p_node_uid={uid} prop__node_children={children || []} />
          </Item>
        );
      })}
    </UList>
  );
}
