import styles from "@styles-components/Explorer.module.scss";
import React, { useState, useMemo, useCallback, useRef } from "react";
import Site from "@/components/reusable/area/Site";
import Img from "@/components/reusable/box/Image";
import SVGDocument from "@/assets/icon/explorer/document-text-outline.svg";
import Box from "@/components/reusable/box/Box";
import type { APIParamMapOfExpNewNode, expNode, nodeTypes } from "@/models/explorer";
import { NODE_TYPE__DOCUMENT, NODE_TYPE__FOLDER } from "@/config/common";
import { fn_POST__exp__new_node } from "@/api/explorer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import {
  init_s__exp_tools__is_click_item__map,
  set_s__exp_f_nodes__is_fold_node,
  // set_s__exp_f_nodes__is_fold_node__map,
  // set_s__exp_tools__is_click_item,
} from "@/store/common/explorer";

interface Props {
  prop__p_node_id: string;
  prop__node_type: nodeTypes;
  prop__node_children: expNode[];
}

interface NodeTypeMap {
  [NODE_TYPE__FOLDER]: string[];
  [NODE_TYPE__DOCUMENT]: string[];
}

const fn_get__node_name_by_type__map = (_node_children: expNode[]): NodeTypeMap => {
  return _node_children.reduce(
    (obj, node__obj) => {
      obj[node__obj.type] = [...obj[node__obj.type], node__obj.name];
      return obj;
    },
    { [NODE_TYPE__FOLDER]: [] as string[], [NODE_TYPE__DOCUMENT]: [] as string[] }
  );
};

export default function TreeInputNode({ prop__p_node_id, prop__node_type, prop__node_children }: Props): JSX.Element {
  // COND
  const is_FOLDER = prop__node_type === NODE_TYPE__FOLDER;

  // STATE
  const s__explorer = useAppSelector((s) => s.explorer);
  const s__exp__is_active_p_node = s__explorer.nodes.is_active_node__map[prop__p_node_id];
  const s__exp__is_click_tool_item__map = s__explorer.tools.is_click_item__map;
  const s__exp__is_click_tool_item = s__exp__is_click_tool_item__map[prop__node_type];
  const s__exp__is_fold_p_node = s__explorer.nodes.is_fold_f_node__map[prop__p_node_id];
  const dispatch = useAppDispatch();

  const [s__input_value__str, set_s__input_value__str] = useState<string>("");
  const [s__is_focus__input, set_s__is_focus__input] = useState<boolean>(false);

  // REF
  const ref__is_focusing = useRef<boolean>(false);
  const ref__input = useRef<HTMLInputElement>(null);

  // MEMO
  const m__node_name_by_type__map: NodeTypeMap = useMemo(
    () => fn_get__node_name_by_type__map(prop__node_children),
    [prop__node_children]
  );

  // HANDLER
  const cb_handle__change__input = useCallback((e: React.ChangeEvent) => {
    e.stopPropagation();
    const e_tg__curr = e.currentTarget as HTMLInputElement;
    const e_tg__value = e_tg__curr.value;
    set_s__input_value__str(e_tg__value);
  }, []);

  const cb_set__init__input = useCallback(() => {
    set_s__input_value__str("");
    set_s__is_focus__input(false);
  }, []);

  const cb_handle__keyDown__input = useCallback(
    (e: React.KeyboardEvent) => {
      e.stopPropagation();
      const e_tg__curr = e.currentTarget as HTMLInputElement;
      const e_tg__value = e_tg__curr.value;
      const e_key = e.key || e.keyCode;

      if (e_key && e_key !== 13) return;

      if (e_tg__value === "") return;

      let is_duplicated__node_name: boolean =
        m__node_name_by_type__map[is_FOLDER ? NODE_TYPE__FOLDER : NODE_TYPE__DOCUMENT].includes(e_tg__value);
      if (is_duplicated__node_name) return;

      // REQ
      const req_params__map: APIParamMapOfExpNewNode = {
        type: prop__node_type,
        name: e_tg__value,
        r_node_id: "",
        p_node_id: prop__p_node_id,
      };

      fn_POST__exp__new_node(req_params__map)
        .then((node__obj: expNode) => {
          // ADD NODE (SET STATE RESULT)
          // BLUR
        })
        .catch((err: Error) => {
          const ERR_MSG: string = "COMP:TreeInputNode";
          console.error(`${ERR_MSG}\n${err}`);
        });

      // INIT
      cb_set__init__input();
    },
    [is_FOLDER, m__node_name_by_type__map, prop__p_node_id, prop__node_type, cb_set__init__input]
  );

  const cb_handle__blur__input = useCallback(
    (e: React.FocusEvent) => {
      cb_set__init__input();
    },
    [cb_set__init__input]
  );

  useEffect(() => {
    if (s__exp__is_active_p_node && s__exp__is_click_tool_item && !ref__is_focusing.current) {
      dispatch(set_s__exp_f_nodes__is_fold_node(prop__p_node_id));
      ref__is_focusing.current = true;
    }

    if (s__exp__is_fold_p_node && s__exp__is_active_p_node && s__exp__is_click_tool_item && ref__is_focusing.current) {
      dispatch(init_s__exp_tools__is_click_item__map());
      set_s__is_focus__input(true);
      setTimeout(() => {
        ref__input.current?.focus();
      }, 300);
      ref__is_focusing.current = false;
    }
  }, [dispatch, s__exp__is_active_p_node, s__exp__is_click_tool_item, s__exp__is_fold_p_node, prop__p_node_id]);

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
          data-p-node-id={prop__p_node_id}
          data-node-type={prop__node_type}
          value={s__input_value__str}
          spellCheck={false}
          onChange={(e) => cb_handle__change__input(e)}
          onKeyDown={(e) => cb_handle__keyDown__input(e)}
          onBlur={(e) => cb_handle__blur__input(e)}
          ref={ref__input}
        />
      </Box>
    </Site>
  );
}
