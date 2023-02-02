import { cn } from "@/utils";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const Context = createContext({});

export const Tab = ({
  children,
  defaultActive = 0,
  disabledRemove = false,
  lazy,
  name = "",
  onChange,
  onChangeSearchParams,
}) => {
  const [indexActive, setIndexActive] = useState(defaultActive);
  const [search] = useSearchParams();
  const titleRef = useRef(0);
  const contentRef = useRef(0);

  const registerTitleIndex = () => titleRef.current++;
  const registerContentIndex = () => contentRef.current++;

  const _indexActive = useMemo(() => {
    return name ? search.get(name) || indexActive : indexActive;
  }, [indexActive, name, search]);
  return (
    <Context.Provider
      value={{
        name,
        disabledRemove,
        lazy,
        indexActive: _indexActive,
        setIndexActive,
        registerTitleIndex,
        registerContentIndex,
        onChange,
        onChangeSearchParams,
      }}
    >
      {children}
    </Context.Provider>
  );
};

Tab.Title = ({ children, value }) => {
  const {
    indexActive,
    setIndexActive,
    registerTitleIndex,
    name,
    onChange,
    onChangeSearchParams,
  } = useContext(Context);
  const index = useMemo(() => registerTitleIndex(), []);
  const _index = value || index;
  const [search, setSearchParams] = useSearchParams();
  const onClick = (ev) => {
    ev.preventDefault();
    onChange?.(_index);
    if (name) {
      setSearchParams(
        (search) => {
          const _search = new URLSearchParams(search);
          _search.set(name, value || index);
          onChangeSearchParams?.(_search);
          return _search;
        },
        { replace: true }
      );
    } else {
      setIndexActive(index);
    }
  };

  return (
    <a
      onClick={onClick}
      className={cn("nav-link", { active: indexActive == _index })}
      href="#"
    >
      {children}
    </a>
  );
};

Tab.Content = ({ children, value }) => {
  const { indexActive, registerContentIndex, disabledRemove, lazy } =
    useContext(Context);
  const index = useMemo(() => registerContentIndex(), []);
  const _index = value || index;

  const firstRenderRef = useRef(false);

  useEffect(() => {
    if (indexActive == _index) {
      firstRenderRef.current = true;
    }
  }, [indexActive]);

  if (disabledRemove && indexActive != _index) return null;

  if (lazy && !firstRenderRef.current && indexActive != _index) return null;

  return (
    <div
      className={cn("tab-pane fade", { "show active": indexActive == _index })}
    >
      {children}
    </div>
  );
};
