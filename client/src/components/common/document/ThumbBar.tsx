import styles from "@styles-components/Document.module.scss";
import Container from "@/components/reusable/area/Container";
import UList from "@/components/reusable/bar/UList";
import ThumbItem from "@/components/reusable/group/ThumbItem";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import ThumbBox from "@/components/reusable/box/Thumb";
import AddElemIcon from "@/assets/icon/document/duplicate-outline.svg";
import Group from "@/components/reusable/group/Group";
import BtnBox from "@/components/reusable/box/Button";
import { I_input_attrs, I_inp_grp_props } from "@/models/props";
import Modal from "@/components/reusable/complete/Modal";
import React, { useCallback } from "react";
import { init_s__doc_elems__cond_map, set_s__doc_elem__is_click } from "@/store/common/document";
import { useEffect } from "react";
import { uid__doc__add_el_thumb } from "@/config/document";

export default function ThumbBar() {
  const s__doc_elems__arr = useAppSelector((s) => s.document.elem.list);
  const s__doc_elems__is_click__cond_map = useAppSelector((s) => s.document.elem.is_click__cond_map);
  const dispatch = useAppDispatch();

  const cb_handle__close__doc_modal = useCallback(
    (uid: string) => {
      dispatch(set_s__doc_elem__is_click({ uid, cond: false }));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(init_s__doc_elems__cond_map());
  }, [dispatch]);

  return (
    <UList cssModule={styles} className={styles.thumb}>
      <AddElemThumb />
      <Modal
        prop__getter__is_actived={s__doc_elems__is_click__cond_map[uid__doc__add_el_thumb]}
        prop__setter__close_modal={() => cb_handle__close__doc_modal(uid__doc__add_el_thumb)}
      >
        <AddElemContainerInModal />
      </Modal>

      {s__doc_elems__arr.map((obj) => {
        const { uid, title, volume } = obj;
        return <ElemThumb key={uid} _uid={uid} _title={title} _volume={volume} />;
      })}

      {s__doc_elems__arr.map((obj) => {
        const { uid } = obj;
        return (
          <Modal
            prop__getter__is_actived={s__doc_elems__is_click__cond_map[uid]}
            prop__setter__close_modal={() => cb_handle__close__doc_modal(uid)}
          >
            <AddElemContainerInModal />
          </Modal>
        );
      })}
    </UList>
  );
}

function AddElemThumb() {
  const dispatch = useAppDispatch();

  const cb_listen__click__add_el_thumb = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      e.stopPropagation();
      dispatch(set_s__doc_elem__is_click({ uid: uid__doc__add_el_thumb, cond: true }));
    },
    [dispatch]
  );

  return (
    <ThumbItem style_obj={styles} className={"add-elem"} onClick={(e) => cb_listen__click__add_el_thumb(e)}>
      <ThumbBox style_obj={styles} _image={AddElemIcon} />
    </ThumbItem>
  );
}

export const GRP_ID__TITLE = "inp_id__title";
export const GRP_VAL__TITLE = "title";
export const BTN_VAL__ADD_ELEM_CONTAINER = "save";

function AddElemContainerInModal() {
  const cb_listen__submit__container = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Container style_obj={styles} className={"add-elem-in-modal"} onSubmit={(e) => cb_listen__submit__container(e)}>
      <Group style_obj={styles}>
        <label htmlFor={GRP_ID__TITLE}>{GRP_VAL__TITLE}</label>
        <input type={"text"} id={GRP_ID__TITLE} placeholder={GRP_VAL__TITLE} autoComplete={"off"}/>
      </Group>
      {/* <Group style_obj={styles}>
        <label htmlFor={GRP_ID__TITLE}>{GRP_VAL__TITLE}</label>
        <textarea type={"text"} id={GRP_ID__TITLE} placeholder={GRP_VAL__TITLE} />
      </Group> */}
      <BtnBox style_obj={styles} className={"sbm"} type={"submit"} _content={"save"} />
    </Container>
  );
}

function ElemThumb({ _uid, _title, _volume }: any) {
  const dispatch = useAppDispatch();

  const cb_listen__click__el_thumb = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      e.stopPropagation();
      const e_tg_uid = e.currentTarget.dataset.uid;
      if (!e_tg_uid) throw new Error("no dataset uid");
      dispatch(set_s__doc_elem__is_click({ uid: e_tg_uid, cond: true }));
    },
    [dispatch]
  );

  return (
    <ThumbItem style_obj={styles} className={"elem"} data-uid={_uid} onClick={(e) => cb_listen__click__el_thumb(e)}>
      <ThumbBox style_obj={styles} _image={AddElemIcon} _title={_title} _volume={_volume || 0} />
    </ThumbItem>
  );
}
