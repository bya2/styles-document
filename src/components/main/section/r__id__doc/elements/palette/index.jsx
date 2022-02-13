import { useMemo } from "react";
import "../../../../../../styles/main/section/r__id__doc/elements/palette/index.scss";
import { fn_logic__clip__selection_copy } from "../../../../../../logic/clip";

const regex__str_keyword = "^[a-z]*$";
const regex__str_hex = "^#[0-9a-f]{3}([0-9a-f]{3})?$";
const regex__str_rgb =
  "^rgb\\(\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])%?\\s*,\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])%?\\s*,\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])%?\\s*\\)$";
const regex__str_rgba =
  "^rgba\\(\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])%?\\s*,\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])%?\\s*,\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])%?\\s*,\\s*((0.[1-9])|[01])\\s*\\)$";
const regex__str_hsl =
  "^hsl\\(\\s*(0|[1-9]\\d?|[12]\\d\\d|3[0-5]\\d)\\s*,\\s*((0|[1-9]\\d?|100)%)\\s*,\\s*((0|[1-9]\\d?|100)%)\\s*\\)$";
const regex__str_hsla =
  "^hsla\\(\\s*(0|[1-9]\\d?|[12]\\d\\d|3[0-5]\\d)\\s*,\\s*((0|[1-9]\\d?|100)%)\\s*,\\s*((0|[1-9]\\d?|100)%)\\s*,\\s*((0.[1-9])|[01])\\s*\\)$";

const regex__color = new RegExp(
  `${regex__str_keyword}|${regex__str_hex}|${regex__str_rgb}|${regex__str_rgba}|${regex__str_hsl}|${regex__str_hsla}`
);

const Comp_palette = ({ ta__str_value }) => {
  /**
   * Memo
   */
  // const substrs__arr_ta_str_values = useMemo(() => state__content__str_txta_val.split(/[\s]+/), [state__content__str_txta_val]);
  const substrs__arr_ta_str_values = ta__str_value.split(/[\s]+/);

  /**
   * Handler
   */
  const fn_handler__click__a_palette = (e) => {
    const e_curr_tg = e.currentTarget;
    fn_logic__clip__selection_copy(e_curr_tg.children[1]);
  };

  return (
    <ul className="comp_palette flex-container ul-no-space">
      <>
        {substrs__arr_ta_str_values.map((str_ta_value, i) => {
          if (!str_ta_value instanceof String || str_ta_value.length === 0)
            return null;

          // ES: String.prototype.startWith, String.prototype.endWith
          if (!regex__color.test(str_ta_value)) return null;

          return (
            <li
              key={`palette_${i}`}
              className="card li-no-style"
              onClick={(e) => fn_handler__click__a_palette(e)}
            >
              <div className="img" style={{ background: str_ta_value }} />
              <p className="alt p-no-margin">{str_ta_value}</p>
            </li>
          );
        })}
      </>
    </ul>
  );
};
export default Comp_palette;
