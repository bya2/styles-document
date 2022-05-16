import { I_btn_props, I_re_props } from "@/models/props";

export interface I_btn_box_props extends I_re_props, I_btn_props {
  // _image: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

export default function BtnBox({ style_obj, className, _class, type, _image: Img, _content, ...props }: I_btn_box_props) {
  return (
    <div className={`${style_obj.box} ${style_obj.button} ${style_obj[className || ""]} ${_class}`}>
      <button {...props} type={type}>
        {Img ? <Img /> : undefined}
        {_content ? <span>{_content}</span> : undefined}
      </button>
    </div>
  );
}
