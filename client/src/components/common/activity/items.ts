import ExplorerIcon from "@/assets/icon/activity/documents-outline.svg";
import ListIcon from "@/assets/icon/activity/bookmarks-outline.svg";
import BackArrowIcon from "@/assets/icon/arrow-back-outline.svg";
import SignUpIcon from "@assets/icon/auth/person-add-outline.svg";
import SignInIcon from "@assets/icon/auth/log-in-outline.svg";
import SignOutIcon from "@assets/icon/auth/log-out-outline.svg";
import UserIcon from "@assets/icon/auth/person-outline.svg";
import { fn_POST__auth__sign_up, fn_GET__auth__sign_in } from "@/api/auth";
import type { I_obj } from "@/models/reusables";

export const tool_items__arr: I_obj[] = [
  {
    id: "explorer",
    content: "탐색기",
    SVG: ExplorerIcon,
  },
  {
    id: "visit",
    content: "방문한 페이지 목록",
    SVG: ListIcon,
  },
  {
    id: "bookmark",
    content: "즐겨찾기",
    SVG: ListIcon,
  },
  {
    id: "search",
    content: "페이지나 문서 검색",
    SVG: BackArrowIcon,
  },
];

const sign_in_items__arr: I_obj[] = [
  {
    id: "id__sign_in_item__id",
    content: "아이디",
  },
  {
    id: "id__sign_in_item__password",
    content: "비밀번호",
  },
];

const sign_up_items__arr: I_obj[] = [
  {
    id: "id__sign_up_item__id",
    content: "아이디",
  },
  {
    id: "id__sign_up_item__password",
    content: "비밀번호",
  },
  {
    id: "id__sign_up_item__check_password",
    content: "비밀번호 확인",
  },
  {
    id: "id__sign_up_item__email",
    content: "이메일",
  },
];

export const status_items__at_sign_out__arr: I_obj[] = [
  {
    id: "id__activity_status_item__sign_in",
    content: "로그인",
    SVG: SignInIcon,
    items: sign_in_items__arr,
    api: fn_GET__auth__sign_in,
  },
  {
    id: "menu_item__sign_up",
    content: "회원가입",
    SVG: SignUpIcon,
    items: sign_up_items__arr,
    api: fn_POST__auth__sign_up,
  },
];

export const status_items__at_sign_in__arr: I_obj[] = [
  {
    id: "menu_item__sign_out",
    content: "로그아웃",
    SVG: SignOutIcon,
  },
  {
    id: "menu_item__user",
    content: "사용자",
    SVG: UserIcon,
  },
];
