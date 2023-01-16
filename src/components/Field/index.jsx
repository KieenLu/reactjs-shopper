import React, { memo } from "react";
import { ErrorForgot, ErrorText, StyleField } from "./style";
import classNames from "classnames";

export const Field = memo(
  ({
    label,
    renderField,
    required,
    type = "text",
    error,
    defaultValue,
    forgot,
    ...props
  }) => {
    return (
      <StyleField className={classNames("form-group", { error })}>
        {label && <label>{label}</label>}
        {renderField ? (
          renderField?.(props)
        ) : (
          <input
            className="form-control form-control-sm"
            {...props}
            type={type}
            defaultValue={defaultValue}
          />
        )}
        {error && forgot ? (
          <ErrorForgot>{error}</ErrorForgot>
        ) : (
          <ErrorText>{error}</ErrorText>
        )}
      </StyleField>
    );
  }
);
