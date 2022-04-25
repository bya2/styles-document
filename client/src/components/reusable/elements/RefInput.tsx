import { useRef, useImperativeHandle, InputHTMLAttributes, Ref, forwardRef } from "react";

interface T_input_props extends InputHTMLAttributes<HTMLInputElement> {}

function Input(props: T_input_props, ref: Ref<HTMLInputElement>) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, [inputRef]);

  return (
    <input
      {...props}
      data-id={props.id}
      ref={inputRef}
    />
  );
}

const CompRefInput = forwardRef<HTMLInputElement, T_input_props>(Input);
export default CompRefInput;
