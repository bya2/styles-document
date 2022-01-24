import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import qs from "qs";

import "../../../styles/main/r__id/side_bar.scss";
import font_awesome from "../../../icon/font_awesome.json";

// Constants
const Scheme = "http";
const HOST = "localhost";
const PORT = "8080";

const UserSideBar = () => {
  // Local states
  const [state__arr_docs, set_state__arr_docs] = useState([]);
  const [state__is_active__adding_doc, set_state__is_active__adding_doc] =
    useState(false);
  const [state__obj_doc_info, set_state__obj_doc_info] = useState({
    alt: "",
    str_doc_name: "",
  });
  const [state__is_mouse_down, set_state__is_mouse_down] = useState(false);
  const [state__is_disabled__input, set_state__is_disabled__input] =
    useState(false);

  // Local refs
  const ref__add_doc__input = useRef();

  // REST API
  const fn_GET_load_docs = () => {
    const ENDPOINT = "/user";
    const STR_URL = `${Scheme}://${HOST}:${PORT}${ENDPOINT}`;

    axios
      .get(STR_URL)
      .then((res) => {
        console.log(res.data);
        set_state__arr_docs(res.data);
      })
      .catch((err) => {
        console.error(`Error: DocSideBar.fn_GET_load_docs\n${err}`);
      });
  };

  const fn_POST_add_doc = (e) => {
    const ENDPOINT = "/doc";
    const STR_URL = `${Scheme}://${HOST}:${PORT}${ENDPOINT}`;

    const obj_axios_POST_options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(state__obj_doc_info),
      url: STR_URL,
    };

    console.log(qs.stringify(state__obj_doc_info));

    axios(obj_axios_POST_options)
      .then((res) => {
        set_state__arr_docs([...state__arr_docs, res.data]);
      })
      .catch((err) => {
        console.error(`Error: DocSideBar.fn_POST_add_doc\n${err}`);
      })
      .then(() => {
        set_state__is_active__adding_doc(false);
        set_state__is_disabled__input(false);

        // Remove string: adding_doc_input
        ref__add_doc__input.current.value = "";
        set_state__obj_doc_info({
          ...state__obj_doc_info,
          [e.target.name]: e.target.value,
        });
      });
  };

  // Just once
  useEffect(() => {
    fn_GET_load_docs();
  }, []);

  useEffect(() => {
    ref__add_doc__input.current.focus();
  }, [state__is_active__adding_doc]);

  // Events
  const fn_on_click__add_doc = () => {
    set_state__is_active__adding_doc(true);
  };

  const fn_on_blur__add_doc_input = (e) => {
    if (state__obj_doc_info.str_doc_name !== "") {
      set_state__is_disabled__input(true);
      fn_POST_add_doc(e);
    }

    set_state__is_active__adding_doc(false);

    // Remove string: adding_doc_input
    ref__add_doc__input.current.value = "";
    set_state__obj_doc_info({
      ...state__obj_doc_info,
      [e.target.name]: e.target.value,
    });
  };

  const fn_on_change__add_doc_input = (e) => {
    set_state__obj_doc_info({
      ...state__obj_doc_info,
      [e.target.name]: e.target.value,
    });
    console.log(state__obj_doc_info);
  };

  const fn_on_key_down__add_doc_input = (e) => {
    if (e.keyCode === 13) {
      set_state__is_disabled__input(true);
      fn_POST_add_doc(e);
    }
  };

  const fn_handler__on_mouse_up_down__doc = (e) => {
    set_state__is_mouse_down(state__is_mouse_down ? false : true);
    const e_tg = e.currentTarget;

    const fn_handler__on_mouse_out__doc = () => {
      set_state__is_mouse_down(false);
      e_tg.removeEventListener("mouseout", fn_handler__on_mouse_out__doc);
    };

    e_tg.addEventListener("mouseout", fn_handler__on_mouse_out__doc, true);
  };

  return (
    <nav className="side_bar">
      <div className="menu_bar">
        <i className="fas fa-file-medical" onClick={fn_on_click__add_doc}></i>
      </div>
      <ul>
        <ul className="tmp"></ul>

        <>
          {/* Loaded data */}
          {state__arr_docs.map((obj, i) => (
            <Link to={obj.str_doc_name} key={obj.alt || i}>
              <li
                name={obj.alt}
                className={state__is_mouse_down ? "state__mouse_down" : ""}
                onMouseDown={fn_handler__on_mouse_up_down__doc}
                onMouseUp={fn_handler__on_mouse_up_down__doc}
              >
                <i className={font_awesome.cls_icon__document_item} />
                <span>{obj.str_doc_name}</span>
              </li>
            </Link>
          ))}
        </>

        {/* Input block */}
        <li
          className={`${"adding_doc"} ${
            state__is_active__adding_doc && "active"
          }`}
        >
          <i className="fas fa-file-medical" />
          <input
            type="text"
            name="str_doc_name"
            placeholder="input..."
            disabled={state__is_disabled__input}
            ref={ref__add_doc__input}
            onBlur={fn_on_blur__add_doc_input}
            onChange={fn_on_change__add_doc_input}
            onKeyDown={fn_on_key_down__add_doc_input}
          />
        </li>
      </ul>
      <div className="resizing_arrow">
        <i className={font_awesome.cls_icon__resizing_arrow}></i>
      </div>
    </nav>
  );
};

export default UserSideBar;
