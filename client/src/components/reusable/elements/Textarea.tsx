import { TextareaHTMLAttributes } from "react";

type T_txta_props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea(props: T_txta_props) {
  return <textarea {...props} data-id={props.id} />;
}
