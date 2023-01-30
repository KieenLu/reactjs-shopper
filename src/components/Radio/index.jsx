import { cn } from "@/utils";
import { createContext, useContext, useId, useRef } from "react";

const Context = createContext({});

export const Radio = ({ children, ...props }) => {
  const id = useId();
  const { selected, name, onChange, onClick } = useContext(Context);
  return (
    <div className="custom-control custom-radio ">
      <input
        onChange={onChange}
        {...props}
        checked={props.value == selected}
        className="custom-control-input"
        type="radio"
        id={id}
        name={name}
      />
      <label
        onClick={() => onClick(props.value)}
        className="custom-control-label flex items-center"
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  );
};

Radio.Toggle = ({ children, ...props }) => {
  const { selected, onChange, name } = useContext(Context);
  return (
    <label
      className={cn("btn btn-sm btn-outline-border", {
        active: props.value == selected,
      })}
    >
      <input
        onChange={onChange}
        {...props}
        selected={props.value == selected}
        type="radio"
        name={name}
      />{" "}
      {children}
    </label>
  );
};

Radio.Group = ({ children, value, toggle, onChange, onCheckedWhen2nd }) => {
  const name = useId();
  const uncheckRef = useRef(false);

  const newOnChange = (ev) => {
    if (!uncheckRef.current) {
      onChange?.(ev);
    }

    uncheckRef.current = false;
  };

  const onClick = (radioValue) => {
    if (onCheckedWhen2nd) {
      if (radioValue == value) {
        onCheckedWhen2nd?.();
        uncheckRef.current = true;
      }
    }
  };

  return (
    <div className={cn({ "btn-group-toggle": toggle })}>
      <Context.Provider
        value={{ selected: value, name, onChange: newOnChange, onClick }}
      >
        {children}
      </Context.Provider>
    </div>
  );
};
