import { Link, generatePath } from "react-router-dom";
import Skeleton from "../Skeleton";
import { PATH } from "@/config/path";

export const CardAddress = ({
  fullName,
  address,
  email,
  phone,
  district,
  province,
  _id,
}) => {
  return (
    <div className="address-card card card-lg bg-light mb-8">
      <div className="card-body">
        {/* Heading */}
        <h6 className="mb-6">{fullName}</h6>
        {/* Text */}
        <p className="text-muted mb-0">
          {phone}, {email} <br />
          {district}, {province}, {address},
        </p>
      </div>
      <div className="card-action card-action-right gap-2 flex">
        {/* Button */}
        <Link
          to={generatePath(PATH.profile.addressDetail, { id: _id })}
          className="btn btn-xs btn-circle btn-white-primary"
        >
          <i className="fe fe-edit-2" />
        </Link>
      </div>
    </div>
  );
};
export const AddressCardLoading = () => {
  return (
    <div className="address-card card card-lg bg-light mb-8">
      <div className="card-body">
        {/* Heading */}
        <h6 className="mb-6">
          <Skeleton height={24} width={200} />
        </h6>
        {/* Text */}
        <p className="text-muted mb-1">
          <Skeleton width={350} height={22} />
        </p>
        <p className="text-muted mb-0">
          <Skeleton width={150} height={22} />
        </p>
      </div>
    </div>
  );
};
