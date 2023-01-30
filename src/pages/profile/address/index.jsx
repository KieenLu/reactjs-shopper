import { AddressCardLoading, CardAddress } from "@/components/AddressCard";
import { PATH } from "@/config/path";
import { useQuery } from "@/hooks/useQuery";
import { userService } from "@/services/user";
import { array } from "@/utils/array";
import React from "react";
import { Helmet } from "react-helmet";
import { Link, generatePath } from "react-router-dom";

export const ProfileAddress = () => {
  const {
    data: { data = [] } = {},
    loading,
    callBackgroundApi,
  } = useQuery({
    queryFn: () => userService.getAddressUser(),
    onSuccess: (res) => {
      res.data.sort((e) => (e.default ? -1 : 0));
    },
  });
  const onRefetch = () => callBackgroundApi();
  return (
    <div className="row">
      <div className="col-12">
        {loading ? (
          array(3).map((_, i) => (
            <AddressCardLoading key={i} className="col-12" />
          ))
        ) : data?.length > 0 ? (
          data?.map((e) => (
            <CardAddress
              key={e._id}
              onDelete={onRefetch}
              onChangeDefault={onRefetch}
              {...e}
              className="col-12"
            />
          ))
        ) : (
          <p className="text-xl border p-5 text-center">
            Hiện bạn chưa có sổ địa chỉ nào, thêm sổ địa chỉ để sử dụng trong
            quá trình mua hàng được tốt hơn.
          </p>
        )}
      </div>

      <div className="col-12">
        {/* Button */}
        <Link
          className="btn btn-block btn-lg btn-outline-border"
          to={PATH.profile.newAddress}
        >
          Add Address <i className="fe fe-plus" />
        </Link>
      </div>
    </div>
  );
};
export default ProfileAddress;
