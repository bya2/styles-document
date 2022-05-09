import type { I_obj } from "@/models/reusables";
import type { I_exp_node } from "@/models/explorer";
import NewDocumentIcon from "@/assets/icon/explorer/add-outline.svg";
import NewFolderIcon from "@/assets/icon/explorer/albums-outline.svg";
import RefreshIcon from "@/assets/icon/explorer/reload-outline.svg";
import RemoveIcon from "@/assets/icon/explorer/close-outline.svg";
import SplitIcon from "@/assets/icon/explorer/grid-outline.svg";
import BookmarkIcon from "@/assets/icon/explorer/star-outline.svg";
import { NODE_TYPE__DOCUMENT, NODE_TYPE__FOLDER, ROOT_NODE_ID } from "@/config/common";

// COMMON
export const tool_items__arr: I_obj[] = [
  {
    // id: "id__tool_item__new_document",
    id: NODE_TYPE__DOCUMENT,
    content: "새로운 문서",
    SVG: NewDocumentIcon,
  },
  {
    // id: "id__tool_item__new_folder",
    id: NODE_TYPE__FOLDER,
    content: "새로운 폴더",
    SVG: NewFolderIcon,
  },
  {
    id: "id__tool_item__refresh",
    content: "새로고침",
    SVG: RefreshIcon,
  },
  {
    id: "id__tool_item__close",
    content: "제거",
    SVG: RemoveIcon,
  },
];

export const menu_items__arr: I_obj[] = [
  {
    id: "extension",
    content: "확장",
    SVG: SplitIcon,
  },
  {
    id: "bookmark",
    content: "북마크",
    SVG: BookmarkIcon,
  },
];

const MSG__NO_ITEM__1 = "Place the route on the explorer.";
const MSG__NO_ITEM__2 = "or";
const MSG__NO_ITEM__3 = "Click this explorer.";
const MSG__NO_ITEM__4 = "(Up to 3)";
export const messages__no_item__arr: string[] = [MSG__NO_ITEM__1, MSG__NO_ITEM__2, MSG__NO_ITEM__3, "-", MSG__NO_ITEM__4];

export const dummies__exp_nodes__arr: I_exp_node[] = [
  {
    uid: "dfdf",
    name: "F1",
    type: NODE_TYPE__FOLDER,
    r_node_uid: ROOT_NODE_ID,
    p_node_uid: ROOT_NODE_ID,
    c_node_uids: ["sssssssss"],
    // children: ["sssssssss"],
  },
  {
    uid: "sssssssss",
    name: "F2",
    type: NODE_TYPE__FOLDER,
    r_node_uid: ROOT_NODE_ID,
    p_node_uid: "dfdf",
    c_node_uids: ["sssssssssb"],
    // children: ["sssssssssb"],
  },
  {
    uid: "sssssssssb",
    name: "D1",
    type: NODE_TYPE__DOCUMENT,
    r_node_uid: ROOT_NODE_ID,
    p_node_uid: "sssssssss",
    // c_node_uids
    // children: [],
  },
  {
    uid: "cc",
    name: "D2",
    type: NODE_TYPE__DOCUMENT,
    r_node_uid: ROOT_NODE_ID,
    p_node_uid: ROOT_NODE_ID,
    // children: [],
  },
  {
    uid: "cd",
    name: "D3",
    type: NODE_TYPE__DOCUMENT,
    r_node_uid: ROOT_NODE_ID,
    p_node_uid: ROOT_NODE_ID,
    // children: [],
  },
  {
    uid: "fa",
    name: "F3",
    type: NODE_TYPE__FOLDER,
    r_node_uid: ROOT_NODE_ID,
    p_node_uid: ROOT_NODE_ID,
    c_node_uids: ["da"],
    // children: ["da"],
  },
  {
    uid: "da",
    name: "D4",
    type: NODE_TYPE__DOCUMENT,
    r_node_uid: ROOT_NODE_ID,
    p_node_uid: "fa",
  },
];
