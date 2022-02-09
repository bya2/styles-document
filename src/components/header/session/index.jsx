import { useCallback, useState } from "react";
import "../../../styles/header/session.scss";
import Modal from "../../resusing/modal";
import SignUp from "../../session/sign_up";
import SignIn from "../../session/sign_in";
import fas_icon__obj_cls from "../../../icon/font_awesome";
import { useRecoilState } from "recoil";
import { g_state__user, g_state__user_valid } from "../../../recoil/atoms";
import { useEffect } from "react";
import { useMemo } from "react";

const {
  cls__icon_sign_up,
  cls__icon_sign_in,
  cls__icon_sign_out,
  cls__icon_bell,
  cls__icon_user,
} = fas_icon__obj_cls;

const arr_sess_elems = {
  state__sign_in: [
    {
      alt: "sign out",
      icon_cls: cls__icon_sign_out,
    },
    {
      alt: "bell",
      icon_cls: cls__icon_bell,
    },
    {
      alt: "user",
      icon_cls: cls__icon_user,
    },
  ],
  state__sign_out: [
    {
      alt: "sign up",
      icon_cls: cls__icon_sign_up,
      comp: (fn_setter__state__close_modal) => (
        <SignUp fn_setter__state__close_modal={fn_setter__state__close_modal} />
      ),
    },
    {
      alt: "sign in",
      icon_cls: cls__icon_sign_in,
      comp: (fn_setter__state__close_modal) => (
        <SignIn fn_setter__state__close_modal={fn_setter__state__close_modal} />
      ),
    },
  ],
};

const init_state__obj_is_occur_event__elem =
  arr_sess_elems.state__sign_out.reduce((obj, t) => {
    obj[t.alt] = false;
    return obj;
  }, {});

const Comp_session__header = () => {
  /**
   * State
   */
  const [g_state__ref_hashed_user, set_g_state__ref_hashed_user] =
    useRecoilState(g_state__user);
  const [g_state__is_valid_hashed, set_g_state__is_valid_hashed] =
    useRecoilState(g_state__user_valid);

  const [state__obj_is_mouse_down__elem, set_state__obj_is_mouse_down__elem] =
    useState(init_state__obj_is_occur_event__elem);
  const [state__obj_is_click__elem, set_state__obj_is_click__elem] = useState(
    init_state__obj_is_occur_event__elem
  );

  const memo__is_sign_in = useMemo(
    () =>
      g_state__ref_hashed_user !== undefined &&
      g_state__ref_hashed_user !== null,
    [g_state__ref_hashed_user]
  );

  /**
   * Setter
   */
  const fn_setter__mouse_down__elem = (tg) =>
    set_state__obj_is_mouse_down__elem({
      ...state__obj_is_mouse_down__elem,
      [tg.getAttribute("name")]: true,
    });

  const fn_setter__mouse_up__elem = () =>
    set_state__obj_is_mouse_down__elem(init_state__obj_is_occur_event__elem);

  const fn_setter__state__click_elem = (tg) =>
    set_state__obj_is_click__elem({
      ...state__obj_is_click__elem,
      [tg.getAttribute("name")]: true,
    });

  const fn_setter__state__close_modal = useCallback(
    () => set_state__obj_is_click__elem(init_state__obj_is_occur_event__elem),
    []
  );

  /**
   * Handler
   */
  const fn_handler__mouse_down__icon = (e) => {
    const e_curr_tg = e.currentTarget;
    fn_setter__mouse_down__elem(e_curr_tg);
  };

  const fn_handler__mouse_up__icon = () => {
    fn_setter__mouse_up__elem();
  };

  const fn_handler__click__elem = (e) => {
    const e_curr_tg = e.currentTarget;
    fn_setter__state__click_elem(e_curr_tg);
  };

  const fn_handler__click__sign_in_elems = (_alt) => {
    switch (_alt) {
      case "sign out":
        sessionStorage.removeItem("ref_hashed_user");
        set_g_state__ref_hashed_user(sessionStorage.getItem("ref_hashed_user"));
        break;
      case "bell":
        break;
      case "user":
        break;
      default:
        break;
    }
  };

  return (
    <span className="comp_session__header">
      <ul className="sess_elem_list" onMouseUp={fn_handler__mouse_up__icon}>
        <>
          {memo__is_sign_in
            ? arr_sess_elems.state__sign_in.map((obj_elem) => (
                <li
                  key={obj_elem.alt}
                  name={obj_elem.alt}
                  className={`sess_elem_box ${obj_elem.alt} ${
                    state__obj_is_mouse_down__elem[obj_elem.alt]
                      ? "state__mouse_down"
                      : undefined
                  }`}
                  onMouseDown={fn_handler__mouse_down__icon}
                  onClick={() => fn_handler__click__sign_in_elems(obj_elem.alt)}
                >
                  <i className={`icon ${obj_elem.icon_cls}`}></i>
                  <p className="name">
                    {obj_elem.alt !== "user"
                      ? obj_elem.alt === "sign out"
                        ? obj_elem.alt
                        : 0
                      : sessionStorage.getItem("ref_user_id")}
                  </p>
                </li>
              ))
            : arr_sess_elems.state__sign_out.map((obj_elem) => (
                <li
                  key={obj_elem.alt}
                  name={obj_elem.alt}
                  className={`sess_elem_box ${
                    state__obj_is_mouse_down__elem[obj_elem.alt]
                      ? "state__mouse_down"
                      : undefined
                  }`}
                  onMouseDown={fn_handler__mouse_down__icon}
                  onClick={fn_handler__click__elem}
                >
                  <i className={`icon ${obj_elem.icon_cls}`}></i>
                  <p className="name">{obj_elem.alt}</p>
                </li>
              ))}
        </>
      </ul>
      <>
        {arr_sess_elems.state__sign_out.map((obj_elem) => (
          <Modal
            key={obj_elem.alt}
            state__is_click__elem={state__obj_is_click__elem[obj_elem.alt]}
            fn_setter__state__close_modal={fn_setter__state__close_modal}
          >
            {obj_elem.comp(fn_setter__state__close_modal)}
          </Modal>
        ))}
      </>
    </span>
  );
};

export default Comp_session__header;
