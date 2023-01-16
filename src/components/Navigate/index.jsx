import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Navigate = ({
  to,
  replace = true,
  dependencylist = [],
  ...props
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { ...props, replace });
  }, dependencylist);

  return null;
};
