import styles from "@styles-components/Status.module.scss";
import Map from "@/components/reusable/wrapper/Map";
import Site from "@/components/reusable/area/Region";
import Img from "@/components/reusable/box/Image";
import UserIcon from "@assets/icon/auth/person-outline.svg";
import Box from "@/components/reusable/box/Box";
import Modal from "@/components/reusable/complete/Modal";
import React, { useState } from "react";
import { I_cond_map, I_obj } from "@/models/reusables";
import { status_items__at_sign_out__arr } from "./items";
import AuthContainer from "../auth/SignContainer";
import { fn_get__init_s__bool_map } from "@/logic/reusable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useMemo } from "react";
import { del_s__auth_ref } from "@/store/common/auth";
import { session_storage_keys__map } from "@/config/storage";

const init_s__cond_map = fn_get__init_s__bool_map(status_items__at_sign_out__arr);

export default function Status() {
  const s__auth__ref_id = useAppSelector((s) => s.auth.ref.id);
  const dispatch = useAppDispatch();
  const [s__is_click_item__map, set_s__is_click_item__map] = useState<I_cond_map>(init_s__cond_map);

  const m__is_sign_in = useMemo(() => {
    return s__auth__ref_id ?? null;
  }, [s__auth__ref_id]);

  const fn_handle__click__close_elem = () => {
    set_s__is_click_item__map(init_s__cond_map);
  };

  const fn_handle__click__status_item = (e: React.MouseEvent) => {
    const e_tg_id = e.currentTarget.getAttribute("data-id");
    if (!e_tg_id) return;

    switch (e_tg_id) {
      case "sign_in":
      case "sign_up":
        set_s__is_click_item__map({
          ...s__is_click_item__map,
          [e_tg_id]: true,
        });
        break;
      case "sign_out":
        dispatch(del_s__auth_ref());
        window.sessionStorage.removeItem(session_storage_keys__map.ss__sds__auth_ref);
        break;
      case "profile":
        break;
      default:
        throw new Error("fn_handle__click__status_item(StatusMap)");
    }
  };

  return (
    <Map cssModule={styles} className={styles.status}>
      {m__is_sign_in ? (
        <SignInStateSite prop__handler__click__item={fn_handle__click__status_item} />
      ) : (
        <SignOutStatusSite prop__handler__click__item={fn_handle__click__status_item} />
      )}

      {status_items__at_sign_out__arr.map((item__obj: I_obj) => {
        const { id, content, items } = item__obj;
        if (!id || !content || !items) return <></>;
        return (
          <Modal
            key={id}
            prop__getter__is_actived={s__is_click_item__map[id]}
            prop__setter__close_modal={() => fn_handle__click__close_elem()}
          >
            <AuthContainer prop__mode={id} prop__items={items} prop__setter__close_modal={() => fn_handle__click__close_elem()} />
          </Modal>
        );
      })}
    </Map>
  );
}

function SignInStateSite({ prop__handler__click__item }: any) {
  const s__auth__ref_id = useAppSelector((s) => s.auth.ref.id);

  return (
    <Site cssModule={styles} className={styles.sign_out}>
      <Box
        prop__id={"profile"}
        cssModule={styles}
        className={`${styles.outer} ${styles.profile}`}
        onClick={(e) => prop__handler__click__item(e)}
      >
        <Img cssModule={styles} className={`${styles.inner} ${styles.profile}`} prop__element={<UserIcon />} />
      </Box>
      <Box cssModule={styles} className={`${styles.content} ${styles.profile}`}>
        <span data-id={"profile"} onClick={(e) => prop__handler__click__item(e)}>
          {s__auth__ref_id}
        </span>
        <span>{" 및 "}</span>
        <span data-id={"sign_out"} onClick={(e) => prop__handler__click__item(e)}>
          {"로그아웃"}
        </span>
      </Box>
    </Site>
  );
}

function SignOutStatusSite({ prop__handler__click__item }: any) {
  return (
    <Site cssModule={styles} className={styles.sign_out}>
      <Box
        prop__id={"sign_in"}
        cssModule={styles}
        className={`${styles.outer} ${styles.profile}`}
        onClick={(e) => prop__handler__click__item(e)}
      >
        <Img cssModule={styles} className={`${styles.inner} ${styles.profile}`} prop__element={<UserIcon />} />
      </Box>
      <Box cssModule={styles} className={`${styles.content} ${styles.profile}`}>
        <span data-id={"sign_in"} onClick={(e) => prop__handler__click__item(e)}>
          {"로그인"}
        </span>
        <span>{" 및 "}</span>
        <span data-id={"sign_up"} onClick={(e) => prop__handler__click__item(e)}>
          {"회원가입"}
        </span>
      </Box>
    </Site>
  );
}
