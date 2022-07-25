import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ItemContainer = styled.div`
  display: flex;
`;

export const ItemTitle = styled.div<{ isCheck: boolean }>`
  ${({ isCheck }) =>
    isCheck &&
    css`
      text-decoration-line: line-through;
    `}
`;

export const ItemButton = styled.button`
  border: none;
  background: none;
`;
