import styled from "styled-components";
import { IDivProps } from "@/misc/interfaces";

interface Props extends IDivProps {}

export default function Scroller({ children }: Props) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
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
