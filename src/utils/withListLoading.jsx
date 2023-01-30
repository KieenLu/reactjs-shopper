import { array } from "./array";

export const withListLoading = (Component, ComponentLoading = Component) => {
  return ({
    loading,
    loadingCount = 3,
    wraperClass = "col-12",
    data,
    empty,
    ...props
  }) => {
    return (
      <>
        {loading
          ? array(loadingCount).map((_, i) => (
              <div key={i} className={wraperClass}>
                <ComponentLoading loading={true} />
              </div>
            ))
          : data.length > 0
          ? data.map((e) => (
              <div key={e._id} className={wraperClass}>
                <Component {...props} {...e} />
              </div>
            ))
          : empty || (
              <div className="col-12">
                <p className="text-xl border p-5 text-center mb-5">
                  Không tìm thấy dữ liệu 😞
                </p>
              </div>
            )}
      </>
    );
  };
};
