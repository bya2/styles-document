import { I_obj } from "@/models/reusables";

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
    id: "sign_in",
    content: "로그인",
    items: sign_in_items__arr,
  },
  {
    id: "sign_up",
    content: "회원가입",
    items: sign_up_items__arr,
  },
];

export const status_items__at_sign_in__arr: I_obj[] = [
  {
    id: "menu_item__sign_out",
    content: "로그아웃",
    // SVG: SignOutIcon,
  },
  {
    id: "menu_item__user",
    content: "사용자",
    // SVG: UserIcon,
  },
];
