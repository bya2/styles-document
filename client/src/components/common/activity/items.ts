import { fn_GET__auth__sign_in, fn_POST__auth__sign_up } from "@/api/auth"; 
import type { item } from "@/models/reusables";

import ExplorerIcon from "@/assets/icon/activity/documents-outline.svg";
import SignUpIcon from "@assets/icon/auth/person-add-outline.svg";
import SignInIcon from "@assets/icon/auth/log-in-outline.svg";
import SignOutIcon from "@assets/icon/auth/log-out-outline.svg";
import UserIcon from "@assets/icon/auth/person-outline.svg";

export const tool_items__arr: item[] = [
  {
    id: "id__tool_item__explorer",
    content: "explorer",
    Icon: ExplorerIcon,
  },
];

const sign_in_items__arr: item[] = [
  {
    id: "id__sign_in_item__id",
    content: "아이디",
  },
  {
    id: "id__sign_in_item__password",
    content: "비밀번호",
  },
];

const sign_up_items__arr: item[] = [
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

export const status_items__at_sign_out__arr: item[] = [
  {
    id: "id__activity_status_item__sign_in",
    content: "로그인",
    Icon: SignInIcon,
    items: sign_in_items__arr,
    api: fn_GET__auth__sign_in,
  },
  {
    id: "menu_item__sign_up",
    content: "회원가입",
    Icon: SignUpIcon,
    items: sign_up_items__arr,
    api: fn_POST__auth__sign_up,
  },
];

export const status_items__at_sign_in__arr: item[] = [
  {
    id: "menu_item__sign_out",
    content: "로그아웃",
    Icon: SignOutIcon,
  },
  {
    id: "menu_item__user",
    content: "사용자",
    Icon: UserIcon,
  },
]