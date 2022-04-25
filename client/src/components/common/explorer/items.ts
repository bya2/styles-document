import type { I_obj } from "@/models/reusables";
import type { expNode } from "@/models/explorer";

import NewDocumentIcon from "@/assets/icon/explorer/add-circle-outline.svg";
import NewFolderIcon from "@/assets/icon/explorer/bag-add-outline.svg";
import RefreshIcon from "@/assets/icon/explorer/refresh-outline.svg";
import RemoveIcon from "@/assets/icon/explorer/close-circle-outline.svg";

import SplitIcon from "@/assets/icon/explorer/grid-outline.svg";
import ExtendIcon from "@/assets/icon/explorer/play-outline.svg";
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

export const layout_menu_items__arr: I_obj[] = [
  {
    id: "id__item__split",
    content: "분할",
    SVG: SplitIcon,
  },
  {
    id: "id__item__expansion",
    content: "확장",
    SVG: ExtendIcon,
  },
];

const MSG__NO_ITEM__1 = "Place the route on the explorer.";
const MSG__NO_ITEM__2 = "or";
const MSG__NO_ITEM__3 = "Click this explorer.";
const MSG__NO_ITEM__4 = "(Up to 3)";
export const messages__no_item__arr: string[] = [MSG__NO_ITEM__1, MSG__NO_ITEM__2, MSG__NO_ITEM__3, "-", MSG__NO_ITEM__4];

// DUMMY
export const dummy_items__exp_nodes__n_arr: expNode[][] = [
  [
    {
      id: "dfdf",
      name: "F1",
      type: NODE_TYPE__FOLDER,
      parent: ROOT_NODE_ID,
      children: ["sssssssss"],
    },
    {
      id: "sssssssss",
      name: "F2",
      type: NODE_TYPE__FOLDER,
      parent: "dfdf",
      children: ["sssssssssb"],
    },
    {
      id: "sssssssssb",
      name: "D1",
      type: NODE_TYPE__DOCUMENT,
      parent: "sssssssss",
      children: [],
    },
    {
      id: "cc",
      name: "D2",
      type: NODE_TYPE__DOCUMENT,
      parent: ROOT_NODE_ID,
      children: [],
    },
    {
      id: "cd",
      name: "D3",
      type: NODE_TYPE__DOCUMENT,
      parent: ROOT_NODE_ID,
      children: [],
    },
    {
      id: "fa",
      name: "F3",
      type: NODE_TYPE__FOLDER,
      parent: ROOT_NODE_ID,
      children: ["da"],
    },
    {
      id: "da",
      name: "D4",
      type: NODE_TYPE__DOCUMENT,
      parent: "fa",
      children: [],
    },
  ],
  // [
  //   {
  //     id: "dfdfe",
  //     name: "OK22",
  //     type: NODE_TYPE__FOLDER,
  //     parent: ROOT_NODE_ID,
  //     children: ["sssssssssa"],
  //   },
  //   {
  //     id: "sssssssssa",
  //     name: "OK",
  //     type: NODE_TYPE__DOCUMENT,
  //     parent: "dfdfe",
  //     children: [],
  //   },
  // ],
];
