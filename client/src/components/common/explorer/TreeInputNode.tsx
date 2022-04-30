import styles from "@styles-components/Explorer.module.scss";
import React, { useState, useMemo, useCallback, useRef } from "react";
import Site from "@/components/reusable/area/Site";
import Img from "@/components/reusable/box/Image";
import SVGDocument from "@/assets/icon/explorer/document-text-outline.svg";
import Box from "@/components/reusable/box/Box";
import type { I_exp_input_node, I_exp_node, T_node } from "@/models/explorer";
import { fn_POST__exp__create_node } from "@/api/explorer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { add_s__exp_node__obj, init_s__exp_tools__is_click__cond_map, set_s__exp_f_node__is_fold } from "@/store/common/explorer";
import { DOC_TYPE, FOLDER_TYPE } from "@/config/explorer";
import { fn_wrap__fb_GET, fn_wrap__fb_POST } from "@/logic/api";
import { I_api_result } from "@/models/api";

interface I_props {
  prop__r_node_uid: string;
  prop__p_node_uid: string;
  prop__node_type: T_node;
  prop__node_children: I_exp_node[];
}

interface I_exp__node_type__map {
  [FOLDER_TYPE]: string[];
  [DOC_TYPE]: string[];
}

const fn_get__node_name_by_type__map = (_node_children: I_exp_node[]): I_exp__node_type__map => {
  return _node_children.reduce(
    (obj, node__obj) => {
      obj[node__obj.type] = [...obj[node__obj.type], node__obj.name];
      return obj;
    },
    { [FOLDER_TYPE]: [] as string[], [DOC_TYPE]: [] as string[] }
  );
};

export default function TreeInputNode({ prop__r_node_uid, prop__p_node_uid, prop__node_type, prop__node_children }: I_props) {
  // COND
  const is_FOLDER = prop__node_type === FOLDER_TYPE;

  // STATE
  const s__explorer = useAppSelector((s) => s.explorer);
  const s__exp__is_active_p_node = s__explorer.nodes.is_active__cond_map[prop__p_node_uid];
  const s__exp__is_click_tool_item__map = s__explorer.tools.is_click__cond_map;
  const s__exp__is_click_tool_item = s__exp__is_click_tool_item__map[prop__node_type];
  const s__exp__is_fold_p_node = s__explorer.nodes.is_fold__cond_map[prop__p_node_uid];
  const dispatch = useAppDispatch();

  const [s__input_value__str, set_s__input_value__str] = useState<string>("");
  const [s__is_focus__input, set_s__is_focus__input] = useState<boolean>(false);

  // REF
  const ref__is_focusing = useRef<boolean>(false);
  const ref__input = useRef<HTMLInputElement>(null);

  // MEMO
  const m__node_name_by_type__map: I_exp__node_type__map = useMemo(
    () => fn_get__node_name_by_type__map(prop__node_children),
    [prop__node_children]
  );

  // HANDLER
  const cb_handle__change__input = useCallback((e: React.ChangeEvent) => {
    e.stopPropagation();

    const curr_tg = e.currentTarget as HTMLInputElement;
    const curr_tg_value = curr_tg.value;

    set_s__input_value__str(curr_tg_value);
  }, []);

  const cb_set__init__input = useCallback(() => {
    set_s__input_value__str("");
    set_s__is_focus__input(false);
  }, []);

  const cb_handle__keyDown__input = useCallback(
    (e: React.KeyboardEvent, _r_node_uid: string, _p_node_uid: string, _node_type: T_node) => {
      e.stopPropagation();

      const curr_tg = e.currentTarget as HTMLInputElement;
      const curr_tg_value = curr_tg.value;
      const curr_key: string | number = e.key || e.keyCode;

      if (curr_key !== "Enter" && curr_key !== 13) return;
      if (curr_tg_value === "") return;
      let is_duplicated__node_name = m__node_name_by_type__map[is_FOLDER ? FOLDER_TYPE : DOC_TYPE].includes(curr_tg_value);
      if (is_duplicated__node_name) return;

      const req_params__map: I_exp_input_node = {
        type: _node_type,
        name: curr_tg_value,
        r_node_uid: _r_node_uid,
        p_node_uid: _p_node_uid,
      };

      fn_wrap__fb_POST<I_exp_input_node, string>(fn_POST__exp__create_node, req_params__map).then((_uid) => {
        if (!_uid) return;

        // INIT
        cb_set__init__input();
        dispatch(
          add_s__exp_node__obj({
            uid: _uid,
            ...req_params__map,
          })
        );
      });
    },
    [dispatch, is_FOLDER, m__node_name_by_type__map, cb_set__init__input]
  );

  const cb_handle__blur__input = useCallback(
    (e: React.FocusEvent) => {
      cb_set__init__input();
    },
    [cb_set__init__input]
  );

  useEffect(() => {
    if (s__exp__is_active_p_node && s__exp__is_click_tool_item && !ref__is_focusing.current) {
      dispatch(set_s__exp_f_node__is_fold({ uid: prop__p_node_uid, cond: true }));
      ref__is_focusing.current = true;
    }

    if (s__exp__is_fold_p_node && s__exp__is_active_p_node && s__exp__is_click_tool_item && ref__is_focusing.current) {
      dispatch(init_s__exp_tools__is_click__cond_map());
      set_s__is_focus__input(true);
      setTimeout(() => {
        ref__input.current?.focus();
      }, 300);
      ref__is_focusing.current = false;
    }
  }, [dispatch, s__exp__is_active_p_node, s__exp__is_click_tool_item, s__exp__is_fold_p_node, prop__p_node_uid]);

  return (
    <Site
      cssModule={styles}
      className={`${styles.node} ${styles.input} ${
        s__exp__is_active_p_node && s__is_focus__input ? styles.s__focus : styles.s__not_focus
      }`}
    >
      <Img cssModule={styles} className={styles.f_node_arrow} />
      <Img cssModule={styles} className={styles.node_type_image} prop__element={<SVGDocument />} />
      <Box cssModule={styles} className={styles.input}>
        <input
          type={"text"}
          data-p-node-id={prop__p_node_uid}
          data-node-type={prop__node_type}
          value={s__input_value__str}
          spellCheck={false}
          onChange={(e) => cb_handle__change__input(e)}
          onKeyDown={(e) => cb_handle__keyDown__input(e, prop__r_node_uid, prop__p_node_uid, prop__node_type)}
          onBlur={(e) => cb_handle__blur__input(e)}
          ref={ref__input}
        />
      </Box>
    </Site>
  );
}
