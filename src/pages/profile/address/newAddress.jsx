import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { Form } from "@/components/Form";
import { MESSAGE } from "@/config/message";
import { PATH } from "@/config/path";
import { useQuery } from "@/hooks/useQuery";
import { userService } from "@/services/user";
import { handleError } from "@/utils/handleError";
import { isEqual } from "@/utils/isEqual";
import { regexp, required } from "@/utils/validate";
import { Spin, message } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddressDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const rules = {
    fullName: [required()],
    phone: [required(), regexp("phone")],
    email: [required(), regexp("email")],
    province: [required()],
    district: [required()],
    address: [required()],
  };
  const { data: { data: address = null } = {}, loading: dataLoading } =
    useQuery({
      queryFn: () => userService.getAddressDetailUser(id),
      enabled: !!id,
    });
  const { loading, refetch: addAddressUserService } = useQuery({
    queryFn: ({ params }) => userService.addAddressUser(...params),
    enabled: false,
  });
  const { loading: editLoading, refetch: editAddressUserService } = useQuery({
    queryFn: ({ params }) => userService.editAddressUser(...params),
    enabled: false,
  });
  const onSubmit = async (values) => {
    try {
      if (id) {
        if (isEqual(address, values)) {
          return message.warning({
            content: WARNING.NOT_HAVE_CHANGE_TO_EDIT,
            key: "warning",
          });
        }
        await editAddressUserService(id, values);
        message.success(MESSAGE.EDIT_ADDRESS_SUCCESS);
      } else {
        await addAddressUserService(values);
        message.success(MESSAGE.ADD_ADDRESS_SUCCESS);
      }
      navigate(PATH.profile.address);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Spin spinning={dataLoading}>
      <Form form={{ rules, initialValue: address }} onSubmit={onSubmit}>
        <div className="row">
          <div className="col-12">
            <Form.Item name="fullName">
              <Field label="Họ và Tên *" placeholder="Họ và Tên . . ." />
            </Form.Item>
          </div>
          <div className="col-12 col-md-6">
            <Form.Item name="phone">
              <Field
                label="Số điện thoại *"
                placeholder="Số điện thoại . . ."
              />
            </Form.Item>
          </div>
          <div className="col-12 col-md-6">
            <Form.Item name="email">
              <Field
                label="Địa chỉ Email *"
                placeholder="Địa chỉ Email . . ."
              />
            </Form.Item>
          </div>
          <div className="col-12 col-md-6">
            <Form.Item name="district">
              <Field label="Quận / Huyện *" placeholder="Quận / Huyện . . ." />
            </Form.Item>
          </div>
          <div className="col-12 col-md-6">
            <Form.Item name="province">
              <Field label="Thành phố *" placeholder="Thành phố . . ." />
            </Form.Item>
          </div>
          <div className="col-12">
            <Form.Item name="address">
              <Field
                label="Địa chỉ hiện tại *"
                placeholder="Địa chỉ hiện tại . . ."
              />
            </Form.Item>
          </div>
        </div>
        {/* Button */}
        <Button loading={loading || editLoading}>
          {id ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
        </Button>
      </Form>
    </Spin>
  );
};

export default AddressDetail;
