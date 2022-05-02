import styles from "@styles-components/Explorer.module.scss";
import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { add_s__exp_o_node__obj, set_s__exp_f_node__is_toggle, set_s__exp_node__is_active } from "@/store/common/explorer";
import Site from "@/components/reusable/area/Site";
import Img from "@/components/reusable/box/Image";
import Content from "@/components/reusable/box/Content";
import RootToolBar from "@/components/common/explorer/RootToolBar";
import SVGDocument from "@/assets/icon/explorer/document-outline.svg";
import SVGFolder from "@/assets/icon/explorer/folder-outline.svg";
import SVGOpenFolder from "@/assets/icon/explorer/folder-open-outline.svg";
import SVGForwardArrow from "@/assets/icon/explorer/chevron-forward-outline.svg";
import SVGDownArrow from "@/assets/icon/explorer/chevron-down-outline.svg";
import { DOC_TYPE, FOLDER_TYPE, ROOT_TYPE } from "@/config/explorer";

interface Props {
  prop__node_uid: string;
  prop__node_name: string;
  prop__node_type: string;
  prop__is_root_node?: boolean;
}

const fn_get__image__by_node_type = (prop__node_type: string, s__is_fold_f_node: boolean = false) => {
  switch (prop__node_type) {
    case DOC_TYPE:
      return SVGDocument;
    case ROOT_TYPE:
    case FOLDER_TYPE:
      return s__is_fold_f_node ? SVGOpenFolder : SVGFolder;
    default:
      const ERR_MSG = "No node type.";
      throw new Error(ERR_MSG);
  }
};

export default function TreeNode({ prop__node_uid, prop__node_name, prop__node_type }: Props): JSX.Element {
  const is_ROOT = prop__node_type === ROOT_TYPE;
  const is_DOCUMENT = prop__node_type === DOC_TYPE;

  const navigate = useNavigate();

  // STATE
  const s__is_fold_f_node = useAppSelector((s) => s.explorer.nodes.is_fold__cond_map[prop__node_uid]);
  const s__is_active_node = useAppSelector((s) => s.explorer.nodes.is_active__cond_map[prop__node_uid]);
  const s__auth__ref_id = useAppSelector((s) => s.auth.ref.id);
  const dispatch = useAppDispatch();

  const is_VALID = s__auth__ref_id === prop__node_uid;

  if (prop__node_uid === "bya2") {
    console.log(s__auth__ref_id, prop__node_uid);
  }

  // CACHE
  const SVGNodeType = useMemo(
    () => fn_get__image__by_node_type(prop__node_type, s__is_fold_f_node),
    [prop__node_type, s__is_fold_f_node]
  );

  // HANDLER
  const cb_handle__mouseDown__node_site = useCallback(
    (_node_uid: string, _node_name: string, _node_type: string) => {
      window.addEventListener(
        "mouseup",
        () => {
          dispatch(set_s__exp_node__is_active({ uid: _node_uid, cond: true }));
          dispatch(set_s__exp_f_node__is_toggle({ uid: _node_uid }));
          if (_node_type === DOC_TYPE) {
            dispatch(add_s__exp_o_node__obj({ uid: _node_uid }));
            navigate(`?doc=${_node_uid}`);
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
        cb_handle__mouseDown__node_site(prop__node_uid, prop__node_name, prop__node_type);
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Img
        cssModule={styles}
        className={styles.f_node_arrow}
        prop__element={is_DOCUMENT ? undefined : s__is_fold_f_node ? <SVGDownArrow /> : <SVGForwardArrow />}
      />
      {is_ROOT ? undefined : <Img cssModule={styles} className={styles.node_type_image} prop__element={<SVGNodeType />} />}
      <Content cssModule={styles} className={styles.node_name} prop__content={prop__node_name} />
      {is_ROOT && is_VALID ? <RootToolBar /> : undefined}
    </Site>
  );
}
