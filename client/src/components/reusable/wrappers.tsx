import styled from "styled-components";
import { IDivProps } from "@/misc/interfaces";

interface Props extends IDivProps {}

export function Layout({ children }: Props) {

}

export function Outer({ children }: Props) {
  return <OuterWrapper>{children}</OuterWrapper>;
}

const OuterWrapper = styled.div`
  position: relative;
  
`;

export function Inner({ children }: Props) {
  return <InnerWrapper>{children}</InnerWrapper>;
}

const InnerWrapper = styled.div`
  
`;

export function Scroller({ children }: Props) {
  return <ScrollerWrapper>{children}</ScrollerWrapper>;
}

const ScrollerWrapper = styled.div`
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.4);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
