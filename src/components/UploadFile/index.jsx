import React, { useRef, useState } from "react";

export const UploadFile = ({ children, onChange }) => {
  const inputRef = useRef();
  const [previewSrc, setPreviewSrc] = useState();

  const onPreview = (ev) => {
    const file = inputRef.current.files[0];
    if (file) {
      onChange?.(file);

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreviewSrc(reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  const triggerEvent = () => {
    inputRef.current.click();
  };
  return (
    <>
      <input
        accept="image/*"
        ref={inputRef}
        onChange={onPreview}
        type="file"
        hidden
      />
      {children?.({
        previewSrc,
        triggerEvent,
      })}
    </>
  );
};
