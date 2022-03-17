import { useEffect } from "react";

export default function CompResizer() {
  // useEffect(() => {
  //   return () => {
  //     window.removeEventListener();
  //   };
  // });

  return (
    <div
      className="comp dragbar resizer"
      onMouseDown={(e) => {
        e.stopPropagation();
        const e_tg__curr = e.target;

        window.addEventListener("mousemove", fn_handle__mouse_move__resizer);

        function fn_handle__mouse_move__resizer(e) {
          console.log(e.clientX);

          window.addEventListener(
            "mouseup",
            () => {
              window.removeEventListener("mousemove", fn_handle__mouse_move__resizer);
            },
            { once: true }
          );
        }

        // window.removeEventListener("mousemove", fn_handle__mouse_move__resizer, false);
      }}
    />
  );
}
