import styles from "@styles-components/Explorer.module.scss";
import { useAppSelector } from "@/store/hooks";
import UList from "@/components/reusable/bar/UList";
import Item from "@/components/reusable/group/Item";
import TreeNode from "@/components/common/explorer/TreeNode";
import TreeNodeChildren from "@/components/common/explorer/TreeNodeChildren";
import { expTree } from "@/models/explorer";
import { NODE__ROOT } from "@/config/common";

export default function TreeBar(): JSX.Element {
  const s__exp_trees__arr = useAppSelector((s) => s.explorer.trees.arr);

  return (
    <UList cssModule={styles} className={`${styles.trees}`} tabIndex={0}>
      {s__exp_trees__arr.map((tree__obj: expTree) => {
        const { id, children } = tree__obj;

        return (
          <Item key={id} prop__id={id} cssModule={styles} className={styles.tree}>
            <TreeNode prop__node_id={id} prop__node_name={id} prop__node_type={NODE__ROOT} />
            <TreeNodeChildren prop__p_node_id={id} prop__node_children={children} />
          </Item>
        );
      })}
    </UList>
  );
}
