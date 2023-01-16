import styled from "styled-components";

export const ErrorText = styled.span`
  color: red;
  position: absolute;
  font-size: 0.875rem;
  font-style: italic;
`;
export const ErrorForgot = styled.span`
  color: red;
  font-size: 0.875rem;
  font-style: italic;
`;

export const StyleField = styled.div`
  &.error {
    .form-control {
      border-color: red;
      color: red;
      ::placeholder {
        color: red;
      }
    }
  }
`;
