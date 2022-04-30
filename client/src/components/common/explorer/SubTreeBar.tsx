import styles from "@styles-components/Explorer.module.scss";
import UList from "@/components/reusable/bar/UList";
import Item from "@/components/reusable/group/Item";
import TreeNode from "@/components/common/explorer/TreeNode";
import TreeNodeChildren from "@/components/common/explorer/TreeNodeChildren";
import { FOLDER_TYPE } from "@/config/explorer";
import type { I_exp_node } from "@/models/explorer";

interface I_props {
  prop__children: I_exp_node[];
}

export default function SubTreeBar({ prop__children }: I_props): JSX.Element {
  return (
    <UList cssModule={styles} className={styles.sub_trees}>
      {prop__children.map((node__obj: I_exp_node) => {
        const { uid, name, type, r_node_uid, children } = node__obj;
        const is_FOLDER = type === FOLDER_TYPE;

        return (
          <Item key={uid} prop__id={uid} cssModule={styles} className={styles.sub_tree}>
            <TreeNode prop__node_uid={uid} prop__node_name={name} prop__node_type={type} />
            {is_FOLDER ? (
              <TreeNodeChildren prop__r_node_uid={r_node_uid} prop__p_node_uid={uid} prop__node_children={children || []} />
            ) : undefined}
          </Item>
        );
      })}
    </UList>
  );
}
