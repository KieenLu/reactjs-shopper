import { useForm } from "@/hooks/useForm";
import { regexp, required } from "@/utils/validate";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import { Button } from "../Button";
import { Field } from "../Field";
import { useSearchParams } from "react-router-dom";
import { userService } from "@/services/user";
import { handleError } from "@/utils/handleError";
import { message } from "antd";

export const ForgotPasswordModal = ({ open, onCancel, onOk }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [search] = useSearchParams();
  const code = search.get("code");
  const { validate, register, values } = useForm({
    username: [
      required(),
      regexp("email", "Vui lòng nhập đúng định dạng Email"),
    ],
  });
  const onSendEmailResetPassword = async (ev) => {
    ev.preventDefault();
    try {
      if (validate()) {
        await userService.sendEmailResetPassword(values);
        message.success(
          "Email lấy lại mật khẩu đã được gửi thành công, vui lòng kiểm tra Email đã đăng ký để thực hiện"
        );
        setIsSuccess(true);
      }
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <Modal
      closable={false}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      bodyStyle={{ padding: 0 }}
    >
      {isSuccess ? (
        <div className="modal-content">
          {/* Close */}
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <i onClick={onCancel} className="fe fe-x" aria-hidden="true" />
          </button>
          {/* Header*/}
          <div className="modal-header line-height-fixed font-size-lg">
            <strong className="mx-auto">
              Gửi Email lấy lại mật khẩu thành công.
            </strong>
          </div>
          {/* Body */}
          <div className="modal-body text-center">
            {/* Text */}
            <p className="mb-7 font-size-sm text-gray-500">
              Chúng tôi đã gửi Email kích hoạt mật khẩu vào Email đã đăng ký của
              bạn, Vui lòng kiểm tra và thực hiện thay đổi mật khẩu.
            </p>
            {/* Form */}
          </div>
        </div>
      ) : (
        <div className="modal-content">
          {/* Close */}
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <i onClick={onCancel} className="fe fe-x" aria-hidden="true" />
          </button>
          {/* Header*/}
          <div className="modal-header line-height-fixed font-size-lg">
            <strong className="mx-auto">Forgot Password?</strong>
          </div>
          {/* Body */}
          <div className="modal-body text-center">
            {/* Text */}
            <p className="mb-7 font-size-sm text-gray-500">
              Vui lòng nhập vào Email đã đăng ký của bạn. Bạn sẽ nhận được Email
              với kèm đường link để có thể tạo mật khẩu mới.
            </p>
            {/* Form */}
            <form>
              {/* Email */}
              <Field
                placeholder="Email Address *"
                required
                forgot
                {...register("username")}
              />

              {/* Button */}
              <Button onClick={onSendEmailResetPassword}>Reset Password</Button>
            </form>
          </div>
        </div>
      )}
    </Modal>
  );
};
