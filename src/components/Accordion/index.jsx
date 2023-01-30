import classNames from "classnames";
import React, { createContext, useContext, useRef, useState } from "react";

const delay = (timing) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timing);
  });
};

const Context = createContext({ activeContent: -1 });

export const Accordion = ({ index, title, children }) => {
  const { activeContent, onActive } = useContext(Context);
  const active = activeContent === index;
  const ref = useRef();
  const _onClick = (ev) => {
    ev.preventDefault();
    onActive(index);
  };
  // useEffect(() => {
  //   (async () => {
  //     if (active) {
  //       ref.current.classList.remove("collapse");
  //       ref.current.classList.add("collapsing");
  //       await delay(150);
  //       ref.current.classList.add("show");
  //     } else {
  //       ref.current.classList.remove("show");
  //     }
  //   })();
  // }, [index, activeContent]);
  return (
    <li className={classNames("list-group-item", { active })}>
      <a
        onClick={_onClick}
        className="dropdown-toggle d-block font-size-lg font-weight-bold text-reset"
        href="#"
      >
        {title}
      </a>
      {active && (
        <div className={classNames("show")}>
          <div className="mt-5">
            <p className="mb-0 font-size-lg text-gray-500">{children}</p>
          </div>
        </div>
      )}
    </li>
  );
};

Accordion.Group = ({ children }) => {
  const [activeContent, setActiveContent] = useState(-1);
  const onActive = (i) => {
    setActiveContent(i === activeContent ? -1 : i);
  };
  return (
    <Context.Provider value={{ onActive, activeContent }}>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, { index: i })
      )}
    </Context.Provider>
  );
};
