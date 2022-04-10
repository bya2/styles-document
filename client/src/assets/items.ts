import fontawesome from "@/assets/fontawesome.json";
import Explorer from "@/assets/icon/activity/documents-outline.svg";
import type { item } from "@/models/reusables";
import type { expNode } from "@/models/Explorer";

// COMMON
export const activity_tool_items__arr: item[] = [
  {
    id: "id__activity_tool_item__explorer",
    content: "explorer",
    Icon: Explorer,
  },
];

export const tool_items__arr: item[] = [
  {
    id: "tool_item__new_document",
    content: "new document",
    icon: fontawesome.explorer.tool.document,
  },
  {
    id: "tool_item__new_folder",
    content: "new folder",
    icon: fontawesome.explorer.tool.folder,
  },
  {
    id: "tool_item__refresh",
    content: "refresh",
    icon: fontawesome.explorer.tool.refresh,
  },
  {
    id: "tool_item__close",
    content: "close",
    icon: fontawesome.explorer.tool.close,
  },
];

// DUMMY
export const dummy_items__exp_nodes__n_arr: expNode[][] = [
  [
    {
      id: "dfdf",
      name: "OK",
      type: "F",
      parent: undefined,
      children: ["sssssssss"],
    },
    {
      id: "sssssssss",
      name: "OK",
      type: "F",
      parent: "dfdf",
      children: ["sssssssssb"],
    },
    {
      id: "sssssssssb",
      name: "OK",
      type: "D",
      parent: "sssssssss",
      children: [],
    },
  ],
  [
    {
      id: "dfdfe",
      name: "OK22",
      type: "F",
      parent: undefined,
      children: ["sssssssssa"],
    },
    {
      id: "sssssssssa",
      name: "OK",
      type: "D",
      parent: "dfdfe",
      children: [],
    },
  ],
];
