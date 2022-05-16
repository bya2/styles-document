import { I_div_props, I_re_props } from "@/models/props";

export interface I_thumb_props extends I_re_props, I_div_props {
  _image: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  _title?: string;
  _volume?: number;
}

export default function Thumb({ style_obj, className, _image: Img, _title, _volume, ...props }: I_thumb_props) {
  return (
    <div {...props} className={`${style_obj.box} ${style_obj.thumb} ${style_obj[className || ""]}`}>
      <div className={style_obj.image}>{<Img />}</div>
      <div className={style_obj.info}>
        <span className={style_obj.title}>{_title}</span>
        <span className={style_obj.volume}>{_volume}</span>
      </div>
    </div>
  );
}
