import styled from "styled-components";

export const ShortedContentStyle = styled.div`
  .content {
    overflow: hidden;
  }
  .read-more {
    display: flex;
    align-items: flex-end;
    position: absolute;
    bottom: -14px;
    background: linear-gradient(transparent 0%, white 50%, white 100%);
    height: 50px;
    width: 100%;
  }
`;
