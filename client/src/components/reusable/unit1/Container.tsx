import type { IReusableProps as IProps } from "@models/Props" 

export default function Container({ children, className, onSubmit }: IProps): JSX.Element {
  return (
    <div className={className}>
      <form onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  )
}