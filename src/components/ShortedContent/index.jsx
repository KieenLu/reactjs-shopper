import React, { useState } from "react";
import { ShortedContentStyle } from "./style";

export const ShortedContent = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <ShortedContentStyle>
      <div
        style={{ height: open ? "auto" : 300 }}
        className="content"
        dangerouslySetInnerHTML={{ __html: children }}
      />
      {!open && (
        <a
          href="#"
          onClick={(ev) => {
            ev.preventDefault();
            setOpen(true);
          }}
          className="read-more"
        >
          Read more
        </a>
      )}
    </ShortedContentStyle>
  );
};
