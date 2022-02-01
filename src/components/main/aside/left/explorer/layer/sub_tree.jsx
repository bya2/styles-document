import { useState } from "react";
import { Link } from "react-router-dom";
import cls_list__fas_icon from "../../../../../../icon/font_awesome";
const { cls__icon_down, cls__icon_right, cls__icon_doc, cls__icon_group } =
  cls_list__fas_icon;

const Comp_explorer_layer_sub_tree = ({ children, obj_sub_tree_node }) => {
  console.log("comp_explorer_layer_sub_tree");

  /**
   * State
   */

  /**
   * Handler
   */
  const fn_handler__click__p_node__group = (e) => {
    const e_curr_tg = e.currentTarget;
  };

  return (
    <li className="sub_tree">
      <div className="box p_node" onClick={fn_handler__click__p_node__group}>
        {obj_sub_tree_node.type === "group" ? (
          // <div className="box p_node" onClick={fn_handler__click__p_node__group}>
          <>
            <i className={`fold_icon ${cls__icon_down}`}></i>
            <i className={`icon ${cls__icon_group}`}></i>
            <p className="name">{obj_sub_tree_node.name}</p>
          </>
        ) : (
          // </div>
          <Link to={obj_sub_tree_node.id}>
            {/* <div className="box p_node"> */}
            <i className={`icon ${cls__icon_doc}`}></i>
            <p className="name">{obj_sub_tree_node.name}</p>
            {/* </div> */}
          </Link>
        )}
      </div>
      {children}
    </li>
  );
};
export default Comp_explorer_layer_sub_tree;
