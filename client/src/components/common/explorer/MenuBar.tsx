import styles from "@styles-components/Explorer.module.scss";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import UList from "@/components/reusable/bar/UList";
import Content from "@/components/reusable/box/Content";
import Img from "@/components/reusable/box/Image";
import Item from "@/components/reusable/group/Item";
import { layout_menu_items__arr } from "./items";
import { set_s__exp_menus__is_click_item__map } from "@/store/common/explorer";

export default function MenuBar() {
  // State
  const s__exp_menus__is_click_item__map = useAppSelector((s) => s.explorer.menus.is_click_item__map);
  const dispatch = useAppDispatch();

  // Handler
  const fn_handle__click__menu_item = (e: React.MouseEvent) => {
    const e_tg__key = e.currentTarget.getAttribute("data-id");
    if (!e_tg__key) return;

    dispatch(
      set_s__exp_menus__is_click_item__map({
        ...s__exp_menus__is_click_item__map,
        [e_tg__key]: true,
      })
    );
  };

  return (
    <UList cssModule={styles} className={styles.menu}>
      {layout_menu_items__arr.map((item__obj) => {
        const { id, content, SVG } = item__obj;
        const element = SVG ? <SVG /> : undefined;
        return (
          <Item key={id} prop__id={id} cssModule={styles} className={styles.menu} onClick={(e) => fn_handle__click__menu_item(e)}>
            <Img cssModule={styles} prop__element={element} />
            <Content cssModule={styles} prop__content={content} prop__is_tooltip={true} />
          </Item>
        );
      })}
    </UList>
  );
}
