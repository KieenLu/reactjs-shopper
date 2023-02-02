import { cn } from "@/utils";
import { Popover } from "antd";
import React from "react";
import { ErrorText } from "../Field/style";

export const Input = (props) => {
  return (
    <div
      className={cn("input-group input-group-merge border", {
        "error  border-solid !border-[red] !text-[red] ": props.error,
      })}
      onChange={(ev) => props.onChange?.(ev.target.value)}
    >
      <input
        className={cn("form-control border-0", {
          "placeholder:text-[red]": props.error,
        })}
        {...props}
        type={props.type || "text"}
      />
      {props.helper && (
        <Popover
          placement="topRight"
          content={props.helper}
          overlayStyle={{ maxWidth: 250 }}
        >
          <i className="fe fe-help-circle flex items-center justify-center px-4 " />
        </Popover>
      )}
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </div>
  );
};
