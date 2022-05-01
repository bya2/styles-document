import { useCallback, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { set_s__aside_posX__num } from "@/store/reusable/resizer";
import { set_s__act_r_nodes__arr, set_s__act_r_nodes__is_mouse_down__cond_map } from "@/store/common/activity";
import Main from "@/components/layouts/User/Main";
import ActMap from "@/components/common/activity/ActMap";
import ExpMap from "@/components/common/explorer/ExpMap";
import Resizer from "@/components/reusable/complete/Resizer";
import { local_storage_keys__map } from "@/config/storage";
import { fn_get__init_s__bool_map, fn_get__ls_arr_item__arr, fn_handle__error } from "@/logic/reusable";
import type { T_Handler } from "@/models/function";
import SearchMap from "@/components/common/search/SearchMap";
import Bookmark from "@/components/common/bookmark";
import VisitMap from "@/components/common/visit";
import { fn_get__curr_date__str } from "@/logic/date";
import Status from "@/components/common/status";

const cursor_cX__for_fd = 80;
const cursor_cX__for_unfd = 160;

export default function UserIdPage() {
  const { userId: param__user_id } = useParams();

  const s__act_tools__is_active__cond_map = useAppSelector((s) => s.activity.tools.is_active__cond_map);
  const dispatch = useAppDispatch();

  const cb_handle__mouse_move__box: T_Handler<MouseEvent> = useCallback(
    (e: MouseEvent): void => {
      const cursor_cX = e.clientX;

      if (cursor_cX < cursor_cX__for_unfd) {
        dispatch(set_s__aside_posX__num(0));
      } else if (cursor_cX < cursor_cX__for_fd) {
        dispatch(set_s__aside_posX__num(cursor_cX__for_fd));
      } else {
        dispatch(set_s__aside_posX__num(cursor_cX));
      }

      window.addEventListener(
        "mouseup",
        () => {
          window.removeEventListener("mousemove", cb_handle__mouse_move__box);
        },
        { once: true }
      );
    },
    [dispatch]
  );

  const cb_handle__side__mount_and_update = useCallback(() => {
    try {
      if (!param__user_id) throw new Error("no param__user_id.");

      const curr_r_node__obj: I_act_r_node = {
        id: param__user_id,
        occured_at: fn_get__curr_date__str(),
      };

      let cached_r_nodes__arr = fn_get__ls_arr_item__arr<I_act_r_node>(local_storage_keys__map.visited_pages);
      cached_r_nodes__arr = cached_r_nodes__arr.filter((r_node) => r_node.id !== param__user_id);
      let sorted_r_nodes__arr = [curr_r_node__obj, ...cached_r_nodes__arr];

      window.localStorage.setItem(local_storage_keys__map.visited_pages, JSON.stringify(sorted_r_nodes__arr));

      dispatch(set_s__act_r_nodes__arr(sorted_r_nodes__arr));
      dispatch(set_s__act_r_nodes__is_mouse_down__cond_map(fn_get__init_s__bool_map(sorted_r_nodes__arr)));
    } catch (err) {
      fn_handle__error(err, { loc: "UserIdPage.side.mount" });
    }
  }, [dispatch, param__user_id]);

  useEffect(() => {
    cb_handle__side__mount_and_update();
  }, [cb_handle__side__mount_and_update]);

  return (
    <Main>
      <aside className="main-left">
        <Status />
        <ActMap />
        {s__act_tools__is_active__cond_map.explorer ? <ExpMap /> : undefined}
        {s__act_tools__is_active__cond_map.visit ? <VisitMap /> : undefined}
        {s__act_tools__is_active__cond_map.bookmark ? <Bookmark /> : undefined}
        {s__act_tools__is_active__cond_map.search ? <SearchMap /> : undefined}
      </aside>
      <Resizer prop__handler__mouse_move__box={cb_handle__mouse_move__box} />
      <Outlet />
    </Main>
  );
}
