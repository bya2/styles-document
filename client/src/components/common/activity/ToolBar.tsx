import styles from "@styles-components/common/Activity.module.scss";

import UList from "@/components/reusable/elements/UList";
import Content from "@/components/reusable/unit1/Content";
import { activity_tool_items__arr } from "@/assets/items";
import type { item } from "@/models/reusables";

const img_color = "#fff";
const img_size = 30;

export default function ToolBar(): JSX.Element {
  return (
    <div className={styles.area__tool_bar}>
      <UList className={styles.bar}>
        {activity_tool_items__arr.map((tool_item__obj: item) => {
          const { id, content, Icon } = tool_item__obj;
          return (
            <li key={id} className={styles.group}>
              <Icon className={styles.box__icon} />
              <Content className={styles.box__content} prop__content={content} prop__is_tooltip={true} />
            </li>
          );
        })}
      </UList>
    </div>
  );
}
