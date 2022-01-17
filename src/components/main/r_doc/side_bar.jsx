import "../../../styles/main/r_doc/side_bar.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import qs from "qs";

// Dummy data
const arr_dummy_docs = [
  {
    alt: "DUMMY_DOC_1",
    str_doc_name: "DUMMY_DOC_NAME_1",
  },
  {
    alt: "DUMMY_DOC_2",
    str_doc_name: "DUMMY_2",
  },
];

// Constants
const Scheme = "http";
const HOST = "localhost";
const PORT = "8080";

const DocSideBar = () => {
  // Local states
  const [arr_docs, set_arr_docs] = useState([]);
  const [is_active__adding_doc, set_is_active__adding_doc] = useState(false);
  const [obj_doc_info, set_obj_doc_info] = useState({
    alt: "",
    str_doc_name: "",
  });

  // Local refs
  const ref_adding_doc_input = useRef();

  // REST API
  const fn_GET_load_docs = () => {
    const ENDPOINT = "/user";
    const STR_URL = `${Scheme}://${HOST}:${PORT}${ENDPOINT}`;

    axios
      .get(STR_URL)
      .then((res) => {
        console.log(res.data);
        set_arr_docs(res.data);
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
      data: qs.stringify(obj_doc_info),
      url: STR_URL,
    };

    console.log(qs.stringify(obj_doc_info));

    axios(obj_axios_POST_options)
      .then((res) => {
        set_arr_docs([...arr_docs, res.data]);
      })
      .catch((err) => {
        console.error(`Error: DocSideBar.fn_POST_add_doc\n${err}`);
      })
      .then(() => {
        set_is_active__adding_doc(false);

        // Remove string: adding_doc_input
        ref_adding_doc_input.current.value = "";
        set_obj_doc_info({
          ...obj_doc_info,
          [e.target.name]: e.target.value,
        });
      });
  };

  // Just once
  useEffect(() => {
    fn_GET_load_docs();
  }, []);

  useEffect(() => {
    console.log("effect");
    ref_adding_doc_input.current.focus();
  }, [is_active__adding_doc]);

  // Events
  const fn_on_click__add_doc = () => {
    console.log("click");
    set_is_active__adding_doc(true);
  };

  const fn_on_blur__add_doc_input = (e) => {
    console.log("blur");

    if (obj_doc_info.str_doc_name !== "") {
      console.log(obj_doc_info);
      fn_POST_add_doc(e);
    }

    set_is_active__adding_doc(false);

    // Remove string: adding_doc_input
    ref_adding_doc_input.current.value = "";
    set_obj_doc_info({
      ...obj_doc_info,
      [e.target.name]: e.target.value,
    });
  };

  const fn_on_change__add_doc_input = (e) => {
    set_obj_doc_info({
      ...obj_doc_info,
      [e.target.name]: e.target.value,
    });
    console.log(obj_doc_info);
  };

  const fn_on_key_down__add_doc_input = (e) => {
    if (e.keyCode === 13) {
      fn_POST_add_doc(e);
    }
  };

  return (
    <nav className="side_bar">
      <div className="menu_bar">
        <i className="fas fa-file-medical" onClick={fn_on_click__add_doc}></i>
      </div>
      <ul>
        <ul className="tmp"></ul>
        {arr_dummy_docs.map((obj) => (
          <li key={obj.alt}>
            <i className="fas fa-file-medical" />
            <span>{obj.str_doc_name}</span>
          </li>
        ))}
        {arr_docs.map((obj) => (
          <li key={obj.alt}>
            <i className="fas fa-file-medical" />
            <span>{obj.str_doc_name}</span>
          </li>
        ))}
        <li className={`${"adding_doc"} ${is_active__adding_doc && "active"}`}>
          <i className="fas fa-file-medical" />
          <input
            type="text"
            name="str_doc_name"
            placeholder="input..."
            ref={ref_adding_doc_input}
            onBlur={fn_on_blur__add_doc_input}
            onChange={fn_on_change__add_doc_input}
            onKeyDown={fn_on_key_down__add_doc_input}
          />
        </li>
      </ul>
    </nav>
  );
};

export default DocSideBar;
