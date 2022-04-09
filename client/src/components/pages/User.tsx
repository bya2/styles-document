import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@store/hooks";
import { set_s__aside_posX__num } from "@store/reusable/resizer";

import Resizer from "@/components/reusable/complete/Resizer";
import Main from "@components/layouts/User/Main";
import Section from "@components/layouts/User/Section";
import Aside from "@components/layouts/User/Aside";
import Explorer from "../common/explorer/Explorer";
import Activity from "../common/activity/Activity";

import type { eFunc } from "@/models/Func";

const s_key__visited_users: string = "visited_users";
const aside_posX__0: number = 50;
const aside_posX__min: number = 200;

export default function UserPage(): JSX.Element {
  const { param__user_id } = useParams();
  const dispatch = useAppDispatch();

  const cb_handle__mouse_move__box: eFunc<MouseEvent> = useCallback(
    (e: MouseEvent): void => {
      const e_cX = e.clientX;

      if (e_cX < aside_posX__0) {
        dispatch(set_s__aside_posX__num(0));
      } else if (e_cX < aside_posX__min) {
        dispatch(set_s__aside_posX__num(aside_posX__min));
      } else {
        dispatch(set_s__aside_posX__num(e.clientX));
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
      if (!param__user_id) {
        throw new Error("No param__user_id");
      }

      let converted_ids__str: string;
      const cached_ids__str: string | null = window.localStorage.getItem(s_key__visited_users);

      if (cached_ids__str) {
        const cached_ids__arr = cached_ids__str.split(",").filter((cached_id) => cached_id !== param__user_id);
        converted_ids__str = [param__user_id, ...cached_ids__arr].join(",");
      } else {
        converted_ids__str = param__user_id;
      }
      
      window.localStorage.setItem(s_key__visited_users, converted_ids__str);
    } catch (err) {
      console.error("LOC:UserPage-MOUNT");
      console.error(err);
    }
  }, [param__user_id]);

  return (
    <Main>
      <Aside>
        <Activity />
        <Explorer />
      </Aside>
      <Resizer prop__handler__mouse_move__box={cb_handle__mouse_move__box} />
      <Section />
    </Main>
  );
}
