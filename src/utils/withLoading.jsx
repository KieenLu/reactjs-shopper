import React from "react";

export const withLoading = (Component, LoadingComponent) => {
  return (props) => {
    if (props.loading) {
      return (
        <LoadingComponent>
          <></>
        </LoadingComponent>
      );
    }
    return <Component {...props} />;
  };
};