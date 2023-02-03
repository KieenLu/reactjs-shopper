import React, { useId } from "react";

// export const Checkbox = ({ children, ...props }) => {
//   const id = useId();
//   const _onChange = (ev) => {
//     props?.onChange?.(ev.target.checked);
//   };
//   return (
//     <div className="custom-control custom-checkbox">
//       <input
//         className="custom-control-input"
//         id={id}
//         type="checkbox"
//         checked={props.value}
//         {...props}
//         onChange={_onChange}
//       />
//       <label className="custom-control-label" htmlFor={id}>
//         {children}
//       </label>
//     </div>
//   );
// };

export const Checkbox = ({ children, value, onChange }) => {
  const id = useId();
  const _onChange = (ev) => {
    onChange?.({ target: { value: ev.target.checked } });
  };
  return (
    <div className="custom-control custom-checkbox">
      <input
        className="custom-control-input"
        id={id}
        type="checkbox"
        checked={value}
        onChange={_onChange}
      />
      <label className="custom-control-label" htmlFor={id}>
        {children}
      </label>
    </div>
  );
};
