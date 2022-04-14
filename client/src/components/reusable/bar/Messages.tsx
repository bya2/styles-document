import { Props as baseProps } from "@/models/Props";

interface Props extends baseProps {
  prop__messages?: string[];
}

export default function Message({ cssModule, className, prop__messages, onClick }: Props) {
  return (
    <div className={`${className} ${cssModule?.bar} ${cssModule?.message}`} onClick={onClick}>
      <>
        {prop__messages?.map((message, i) => {
          return <span key={`message${i}`}>{message}</span>;
        })}
      </>
    </div>
  );
}
