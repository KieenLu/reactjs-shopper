import { MESSAGE } from "@/config/message";
import { userService } from "@/services/user";
import { handleError } from "@/utils/handleError";
import { message } from "antd";
import { Link, generatePath } from "react-router-dom";
import { PATH } from "@/config/path";
import Skeleton from "../Skeleton";
import { Button } from "../Button";
import { useRef } from "react";
import { Popconfirm } from "../Popconfirm";

export const CardAddress = ({
  onDelete,
  onChangeDefault,
  _id,
  default: addressDefault,
  fullName,
  district,
  province,
  address,
  email,
  phone,
}) => {
  const loadingDefaultRef = useRef(false);
  const loadingDeleteRef = useRef(false);
  const _onChangeDefault = async (ev) => {
    if (loadingDefaultRef.current) return;

    loadingDefaultRef.current = true;
    try {
      const key = `address-default-${_id}`;
      message.loading({
        key,
        content: MESSAGE.LOADING_MESSAGE,
      });
      await userService.editAddressUser(_id, { default: true });
      onChangeDefault?.(_id);
      message.success({
        key,
        content: MESSAGE.CHANGE_ADDRESS_DEFAULT_SUCCESS,
      });
    } catch (err) {
      handleError(err, key);
    }
    loadingDefaultRef.current = false;
  };

  const _onDelete = async (ev) => {
    if (loadingDeleteRef.current) return;

    loadingDeleteRef.current = true;
    try {
      const key = `remove-address-${_id}`;
      message.loading({
        key,
        content: MESSAGE.LOADING_MESSAGE,
      });
      await userService.deleteAddressUser(_id);
      onDelete?.(_id);
      message.success({
        key,
        content: MESSAGE.DELETE_ADDRESS_SUCCESS,
      });
    } catch (err) {
      handleError(err);
    }
    loadingDeleteRef.current = false;
  };

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

        {addressDefault ? (
          <div className="card-action-right-bottom select-none">
            <div className="link color-success">Địa chỉ mặc định</div>
          </div>
        ) : (
          <div className="card-action-right-bottom hidden">
            <Button size="xs" onClick={_onChangeDefault}>
              Đặt làm địa chỉ mặc định
            </Button>
          </div>
        )}

        {/* Action */}
        <div className="card-action card-action-right gap-2 flex">
          {/* Button */}
          <Link
            className="btn btn-xs btn-circle btn-white-primary"
            to={generatePath(PATH.profile.addressDetail, { id: _id })}
          >
            <i className="fe fe-edit-2" />
          </Link>
          {!addressDefault && (
            <Popconfirm
              placement="topRight"
              title="Cảnh báo"
              cancelText="Hủy bỏ"
              okText="Tiếp tục xóa"
              onOk={_onDelete}
              description={
                <p>
                  Thao tác này sẽ không thể hoàn lại, bạn có chắc chắn muốn thực
                  hiện thao tác này?
                </p>
              }
            >
              <button className="btn btn-xs btn-circle btn-white-primary">
                <i className="fe fe-x"></i>
              </button>
            </Popconfirm>
          )}
        </div>
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
