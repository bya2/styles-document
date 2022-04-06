import type { IReusableProps as IProps } from "@models/Props";

export default function UList({ children, className }: IProps): JSX.Element {
  return (
    <ul className={className}>
      <>
        {children}
      </>
    </ul>
  )
}