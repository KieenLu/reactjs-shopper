import { useCallback } from "react";
import { useState } from "react";
import { validate } from "../utils/validate";

/**
 *
 * @param {*} rules
 * @return register, values, errors, validate
 */
export const useForm = (
  rules,
  { initialValue = {}, dependencies = {} } = {}
) => {
  const [values, setValues] = useState(initialValue || {});
  const [errors, setError] = useState({});

  const register = (name) => {
    return {
      error: errors[name],
      value: values[name] || "",
      onChange: (ev) => {
        let _values = { ...values, [name]: ev.target.value };
        if (rules[name]) {
          const errorObj = {};

          errorObj[name] = validate(
            {
              [name]: rules[name],
            },
            _values
          )[name];

          if (dependencies[name]) {
            for (let depdency of dependencies[name]) {
              errorObj[depdency] = validate(
                {
                  [depdency]: rules[depdency],
                },
                _values
              )[depdency];
            }
          }

          setError((prev) => ({ ...prev, ...errorObj }));
        }
        setValues((prev) => ({ ...prev, [name]: ev.target.value }));
      },
    };
  };

  const _validate = () => {
    const errorObject = validate(rules, values);
    console.log(errorObject);

    setError(errorObject);

    return Object.keys(errorObject).length === 0;
  };

  const reset = () => {
    setValues({});
  };

  return {
    values,
    setValues,
    errors,
    register,
    validate: _validate,
    reset,
  };
};
