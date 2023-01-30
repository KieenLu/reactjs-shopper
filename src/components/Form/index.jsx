import { useForm } from "@/hooks/useForm";
import React, { createContext, useContext, useEffect } from "react";

const Context = createContext({});

export const Form = ({
  children,
  onSubmit,
  form = { initialValue: undefined, rules: undefined, dependencies: {} },
}) => {
  useEffect(() => {
    if (form.initialValue) {
      _form.setValues(form.initialValue);
    }
  }, [form.initialValue]);
  const _form = useForm(form.rules, form);

  const _onSubmit = (ev) => {
    ev.preventDefault();
    if (_form.validate()) {
      onSubmit?.(_form.values, _form);
    }
  };

  return (
    <Context.Provider value={{ ..._form }}>
      <form onSubmit={_onSubmit}>{children}</form>
    </Context.Provider>
  );
};

Form.Item = ({ name, children }) => {
  const { register } = useContext(Context);

  return React.cloneElement(children, { ...register(name) });
};
