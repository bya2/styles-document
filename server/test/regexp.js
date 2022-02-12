// const regexp = /#\d{3,6}|rgba?\(\)^|hsla?\(\d{1,3},\d%,\d%(,\d)?\)^/;

const reg__d__0_100 = new RegExp(/^[0-9]{1}$|^[1-9]{1}[0-9]{1}$|^100$/);

const reg__percentage = new RegExp(/^([0-9]{1}|[1-9]{1}[0-9]{1}|100)%$/);

const reg__alpha = new RegExp(/^0?(.)[0-9]+$|^[0-1]{1}(.0+)?$/);

const reg_exp__str_per = "^([0-9]{1}|[1-9]{1}[0-9]{1}|100)%$";
const reg_exp__str_255 = "[0-9]{1}|[1-9]{1}";

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

const regex__keyword = new RegExp(regex__str_keyword);
const regex__hex = new RegExp(regex__str_hex);
const regex__rgb = new RegExp(`${regex__str_rgb}|${regex__str_rgba}`);
const regex__hsl = new RegExp(`${regex__str_hsl}|${regex__str_hsla}`);
const regex__color = new RegExp(
  `${regex__str_keyword}|${regex__str_hex}|${regex__str_rgb}|${regex__str_rgba}|${regex__str_hsl}|${regex__str_hsla}`
);

console.log(regex__color.test("black"));
console.log(regex__color.test("#eee"));
console.log(regex__color.test("rgba(0, 0, 0, 0.1)"));
console.log(regex__color.test("hsla(0, 0%, 0%, 0.1)"));

// const reg__d__0_255 = new RegExp(
//   /^[0-9]{1}$|^[1-9]{1}[0-9]{1}$|^1[0-9]{2}$|^2[0-4]{1}[0-9]{1}$|^25[0-5]{1}$/
// );

// const regexp =
//   /^(hsla)?\(1?[0-9]{1,2},1?[0-9]{1,2}%,1?[0-9]{1,2}%,1?[0-9]{1,2}\)$/;

// // console.log("hsl(100)");

// const str = "0";

// console.log(str.match(reg__d__0_100));
// console.log(reg__d__0_100.test(str));
// console.log(reg__d__0_255.test("249"));

// console.log(reg__percentage.test("101%"));

// console.log(reg__hex.test("#333333"));

// console.log(reg__alpha.test("0.1111111111"));

// console.log(reg__rgb.test("100%"));
