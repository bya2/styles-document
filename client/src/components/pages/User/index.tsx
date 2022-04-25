import { useCallback, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { set_s__aside_posX__num } from "@/store/reusable/resizer";
import { set_s__act_roots__arr, set_s__act_roots__is_mouse_down_root__map } from "@/store/common/activity";
import Main from "@/components/layouts/User/Main";
import ActMap from "@/components/common/activity/ActMap";
import ExpMap from "@/components/common/explorer/ExpMap";
import Resizer from "@/components/reusable/complete/Resizer";
import { local_storage_keys__map } from "@/config/storage";
import { fn_get__init_s__bool_map, fn_handle__error__ctx } from "@/logic/reusable";
import type { I_obj } from "@/models/reusables";
import type { T_Handler } from "@/models/function";
import SearchMap from "@/components/common/search/SearchMap";
import Bookmark from "@/components/common/bookmark";
import Map from "@/components/reusable/wrapper/Map";
import Area from "@/components/reusable/area/Area";
import VisitMap from "@/components/common/visit";
import { fn_get__curr_date__str } from "@/logic/date";
import Status from "@/components/common/status";

const cursor_cX__for_fd = 80;
const cursor_cX__for_unfd = 160;

export default function UserIdPage() {
  const { userId } = useParams();

  const s__act_tools__is_active_item__map = useAppSelector((s) => s.activity.tools.is_active_item__map);
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

  useEffect(() => {
    try {
      if (!userId) {
        const ERR_MSG = "Mount(UserPageLayout)";
        throw new Error(ERR_MSG);
      }

      let converted_ids__str: string;
      let converted_ids__arr: I_obj[];
      const cached_id_pages__str = window.localStorage.getItem(local_storage_keys__map.visited_pages);

      let usr_page__obj: I_obj = {
        id: userId,
        occured_at: new Date(),
      }

      // 바꿀것.

      if (cached_id_pages__str) {
        const cached_ids__arr = cached_id_pages__str.split(",").filter((cached_id) => cached_id !== userId);
        converted_ids__str = [userId, ...cached_ids__arr].join(",");
      } else {
        converted_ids__str = userId;
      }
      converted_ids__arr = converted_ids__str.split(",").reduce((arr: I_obj[], id: string) => {
        return [...arr, { id, occured_at: fn_get__curr_date__str() }];
      }, []);

      window.localStorage.setItem(local_storage_keys__map.visited_pages, converted_ids__str);

      dispatch(set_s__act_roots__arr(converted_ids__arr));
      dispatch(set_s__act_roots__is_mouse_down_root__map(fn_get__init_s__bool_map(converted_ids__arr)));
    } catch (err) {
      fn_handle__error__ctx(err);
    }
  }, [dispatch, userId]);

  return (
    <Main>
      <aside className="main-left">
        <Status />
        <ActMap />
        {s__act_tools__is_active_item__map.explorer ? <ExpMap /> : undefined}
        {s__act_tools__is_active_item__map.visit ? <VisitMap /> : undefined}
        {s__act_tools__is_active_item__map.bookmark ? <Bookmark /> : undefined}
        {s__act_tools__is_active_item__map.search ? <SearchMap /> : undefined}
      </aside>
      <Resizer prop__handler__mouse_move__box={cb_handle__mouse_move__box} />
      <Outlet />
    </Main>
  );
}
