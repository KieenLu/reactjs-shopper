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
              <Field label="H??? v?? T??n *" placeholder="H??? v?? T??n . . ." />
            </Form.Item>
          </div>
          <div className="col-12 col-md-6">
            <Form.Item name="phone">
              <Field
                label="S??? ??i???n tho???i *"
                placeholder="S??? ??i???n tho???i . . ."
              />
            </Form.Item>
          </div>
          <div className="col-12 col-md-6">
            <Form.Item name="email">
              <Field
                label="?????a ch??? Email *"
                placeholder="?????a ch??? Email . . ."
              />
            </Form.Item>
          </div>
          <div className="col-12 col-md-6">
            <Form.Item name="district">
              <Field label="Qu???n / Huy???n *" placeholder="Qu???n / Huy???n . . ." />
            </Form.Item>
          </div>
          <div className="col-12 col-md-6">
            <Form.Item name="province">
              <Field label="Th??nh ph??? *" placeholder="Th??nh ph??? . . ." />
            </Form.Item>
          </div>
          <div className="col-12">
            <Form.Item name="address">
              <Field
                label="?????a ch??? hi???n t???i *"
                placeholder="?????a ch??? hi???n t???i . . ."
              />
            </Form.Item>
          </div>
        </div>
        {/* Button */}
        <Button loading={loading || editLoading}>
          {id ? "Ch???nh s???a ?????a ch???" : "Th??m ?????a ch??? m???i"}
        </Button>
      </Form>
    </Spin>
  );
};

export default AddressDetail;
