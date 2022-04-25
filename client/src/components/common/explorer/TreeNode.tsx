import styles from "@styles-components/Explorer.module.scss";
import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  add_s__exp_open_nodes__arr,
  set_s__exp_f_nodes__is_toogle_node,
  set_s__exp_nodes__is_active_node,
} from "@/store/common/explorer";
import Site from "@/components/reusable/area/Site";
import Img from "@/components/reusable/box/Image";
import Content from "@/components/reusable/box/Content";
import RootToolBar from "@/components/common/explorer/RootToolBar";
import SVGDocument from "@/assets/icon/explorer/document-outline.svg";
import SVGFolder from "@/assets/icon/explorer/folder-outline.svg";
import SVGOpenFolder from "@/assets/icon/explorer/folder-open-outline.svg";
import SVGForwardArrow from "@/assets/icon/explorer/chevron-forward-outline.svg";
import SVGDownArrow from "@/assets/icon/explorer/chevron-down-outline.svg";
import { NODE_TYPE__DOCUMENT, NODE_TYPE__FOLDER, NODE__ROOT } from "@/config/common";

interface Props {
  prop__node_id: string;
  prop__node_name: string;
  prop__node_type: string;
  prop__is_root_node?: boolean;
}

const fn_get__image__by_node_type = (prop__node_type: string, s__is_fold_f_node: boolean = false) => {
  switch (prop__node_type) {
    case NODE_TYPE__DOCUMENT:
      return SVGDocument;
    case NODE__ROOT:
    case NODE_TYPE__FOLDER:
      return s__is_fold_f_node ? SVGOpenFolder : SVGFolder;
    default:
      const ERR_MSG = "No node type.";
      throw new Error(ERR_MSG);
  }
};

export default function TreeNode({ prop__node_id, prop__node_name, prop__node_type }: Props): JSX.Element {
  const is_ROOT = prop__node_type === NODE__ROOT;
  const is_DOCUMENT = prop__node_type === NODE_TYPE__DOCUMENT;

  const navigate = useNavigate();

  // STATE
  const s__is_fold_f_node = useAppSelector((s) => s.explorer.nodes.is_fold_f_node__map[prop__node_id]);
  const s__is_active_node = useAppSelector((s) => s.explorer.nodes.is_active_node__map[prop__node_id]);
  const dispatch = useAppDispatch();

  // CACHE
  const SVGNodeType = useMemo(
    () => fn_get__image__by_node_type(prop__node_type, s__is_fold_f_node),
    [prop__node_type, s__is_fold_f_node]
  );

  // HANDLER
  const cb_handle__mouseDown__node_site = useCallback(
    (_node_id: string, _node_name: string, _node_type: string) => {
      window.addEventListener(
        "mouseup",
        () => {
          dispatch(set_s__exp_nodes__is_active_node(_node_id));
          dispatch(set_s__exp_f_nodes__is_toogle_node(_node_id));

          const is_DOCUMENT = _node_type === NODE_TYPE__DOCUMENT;

          if (is_DOCUMENT) {
            dispatch(
              add_s__exp_open_nodes__arr({
                id: _node_id,
                name: _node_name,
              })
            );

            navigate(`?doc=${_node_id}`);
          }
        },
        { once: true }
      );
    },
    [dispatch, navigate]
  );

  return (
    <Site
      cssModule={styles}
      className={`${styles.node} ${is_ROOT ? styles.root : ""} ${s__is_active_node ? styles.s__active : ""}`}
      tabIndex={0}
      onMouseDown={(e) => {
        e.stopPropagation();
        cb_handle__mouseDown__node_site(prop__node_id, prop__node_name, prop__node_type);
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Img
        cssModule={styles}
        className={styles.f_node_arrow}
        prop__element={is_DOCUMENT ? undefined : s__is_fold_f_node ? <SVGDownArrow /> : <SVGForwardArrow />}
      />
      {is_ROOT ? undefined : <Img cssModule={styles} className={styles.node_type_image} prop__element={<SVGNodeType />} />}
      {is_DOCUMENT ? (
        // <Link
        //   to={{
        //     search: `?doc=${prop__node_id}`,
        //   }}
        // >
          <Content cssModule={styles} className={styles.node_name} prop__content={prop__node_name} />
        // </Link>
      ) : (
        <Content cssModule={styles} className={styles.node_name} prop__content={prop__node_name} />
      )}
      {is_ROOT ? <RootToolBar /> : undefined}
    </Site>
  );
}
