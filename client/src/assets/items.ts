import fontawesome from "@/assets/fontawesome.json";
import type { item } from "@/models/reusables";

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
]