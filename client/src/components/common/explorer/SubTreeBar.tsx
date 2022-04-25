import styles from "@styles-components/Explorer.module.scss";
import UList from "@/components/reusable/bar/UList";
import Item from "@/components/reusable/group/Item";
import TreeNode from "@/components/common/explorer/TreeNode";
import TreeNodeChildren from "@/components/common/explorer/TreeNodeChildren";
import { NODE_TYPE__FOLDER } from "@/config/common";
import type { expNode } from "@/models/explorer";

interface Props {
  prop__children: expNode[];
}

export default function SubTreeBar({ prop__children }: Props): JSX.Element {
  return (
    <UList cssModule={styles} className={styles.sub_trees}>
      {prop__children.map((node__obj: expNode) => {
        const { id, name, type, children } = node__obj;
        const is_FOLDER = type === NODE_TYPE__FOLDER;
        return (
          <Item key={id} prop__id={id} cssModule={styles} className={styles.sub_tree}>
            <TreeNode prop__node_id={id} prop__node_name={name} prop__node_type={type} />
            {is_FOLDER ? <TreeNodeChildren prop__p_node_id={id} prop__node_children={children as expNode[]} /> : undefined}
          </Item>
        );
      })}
    </UList>
  );
}
