import styled from "styled-components";

export const InputStyle = styled.div`
  display: flex;
  border: 1px, solid #ccc;
  button {
    outline: none;
    width: 30px;
    height: 30px;
    border: none;
    background: none;
  }
  input {
    outline: none;
    width: 50px;
    line-height: 30px;
    border: none;
    text-align: center;
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
  &.disable {
    pointer-event: none;
    opacity: 0.2;
  }
`;
