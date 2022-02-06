import { Link } from "react-router-dom";
import cls_list__fas_icon from "../../../../../../icon/font_awesome";
const { cls__icon_down, cls__icon_right, cls__icon_doc, cls__icon_group } =
  cls_list__fas_icon;

const Comp_explorer_layer_sub_tree = ({
  children,
  obj_sub_tree_node,
  state__is_click__obj_p_node_boxes,
  state__is_active__obj_p_node_boxes,
  state__is_fold_sub_tree__obj_p_group_nodes,
  fn_setter__click_p_node_box,
  fn_setter__blur_p_node_box,
  fn_setter__toggle_fold_sub_tree,
}) => {
  console.log("comp_explorer_layer_sub_tree");

  /**
   * State
   */

  /**
   * Handler
   */
  const fn_handler__click__p_node_box = (e) => {
    const e_curr_tg_name = e.currentTarget.getAttribute("name");
    console.log(e_curr_tg_name);
    fn_setter__click_p_node_box(e_curr_tg_name);
    e.stopPropagation();
  };

  const fn_handler__blur__p_node_box = (e) => {
    const e_curr_tg_name = e.currentTarget.getAttribute("name");
    console.log(e_curr_tg_name);
    fn_setter__blur_p_node_box(e_curr_tg_name);
    e.stopPropagation();
  };

  const fn_handler__click__fold_icon = (e) => {
    const e_curr_tg_name = e.currentTarget.getAttribute("name");
    fn_setter__toggle_fold_sub_tree(e_curr_tg_name);
    // 이벤트 전파 필요 (fn_handler__click__p_node_box)
    // e.stopPropagation();
  };

  return (
    <li className="sub_tree">
      <div
        name={obj_sub_tree_node._id}
        // className="box p_node"
        className={`box p_node ${
          state__is_click__obj_p_node_boxes[obj_sub_tree_node._id]
            ? "click"
            : "no_click"
        } ${
          state__is_active__obj_p_node_boxes[obj_sub_tree_node._id]
            ? "active"
            : "no_active"
        }`}
        onClick={fn_handler__click__p_node_box}
        onBlur={fn_handler__blur__p_node_box}
        tabIndex="0"
      >
        {obj_sub_tree_node.type === "group" ? (
          <>
            <i
              name={obj_sub_tree_node._id}
              className={`fold_icon ${
                state__is_fold_sub_tree__obj_p_group_nodes[
                  obj_sub_tree_node._id
                ]
                  ? cls__icon_down
                  : cls__icon_right
              }`}
              onClick={fn_handler__click__fold_icon}
            ></i>
            <i className={`icon ${cls__icon_group}`}></i>
            <p className="name">{obj_sub_tree_node.name}</p>
          </>
        ) : (
          <Link to={obj_sub_tree_node._id} tabIndex="-1">
            <i className={`icon ${cls__icon_doc}`}></i>
            <p className="name">{obj_sub_tree_node.name}</p>
          </Link>
        )}
      </div>
      <div
        className={`sub_tree_list_box ${
          state__is_fold_sub_tree__obj_p_group_nodes[obj_sub_tree_node._id]
            ? "fold"
            : "unfold"
        }`}
      >
        {children}
      </div>
    </li>
  );
};
export default Comp_explorer_layer_sub_tree;
