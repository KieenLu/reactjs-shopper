import classNames from "classnames";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
const Context = createContext({});
const delay = (timing) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timing);
  });
};
export const Tab = ({ children }) => {
  const [indexActive, setIndexActive] = useState(0);
  const titleRef = useRef(-1);
  const contenRef = useRef(-1);
  const registerTitle = () => {
    return ++titleRef.current;
  };
  const registerContent = () => {
    return ++contenRef.current;
  };
  return (
    <Context.Provider
      value={{ indexActive, setIndexActive, registerContent, registerTitle }}
    >
      {children}
    </Context.Provider>
  );
};

Tab.Content = ({ children }) => {
  const { indexActive, registerContent, setIndexActive } = useContext(Context);
  const index = useMemo(() => registerContent(), []);
  const ref = useRef();
  useEffect(() => {
    async () => {
      if (index === indexActive) {
        ref.current.classList.add("active");
        await delay(150);
        ref.current.classList.add("show");
      } else {
        ref.current.classList.remove("active");
        ref.current.classList.remove("show");
      }
    };
  }, [index, indexActive]);
  return (
    <div ref={ref} className={classNames("tab-pane fade")}>
      {children}
    </div>
  );
};

Tab.Title = ({ children }) => {
  const { indexActive, registerTitle, setIndexActive } = useContext(Context);
  const index = useMemo(() => registerTitle(), []);
  const onClick = (ev) => {
    ev.preventDefault();
    setIndexActive(index);
  };
  return (
    <a
      href="#"
      className={classNames("nav-link", { active: index === indexActive })}
      onClick={onClick}
    >
      {children}
    </a>
  );
};
