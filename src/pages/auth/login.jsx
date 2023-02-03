import { Button } from "@/components/Button";
import { Checkbox } from "@/components/CheckBox";
import { Field } from "@/components/Field";
import { ForgotPasswordModal } from "@/components/ForotPasswordModal";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { loginThunkAction } from "@/stories/auth";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { handleError } from "@/utils/handleError";
import { minMax, regexp, required } from "@/utils/validate";
import { message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loginLoading } = useAuth();
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
  const { validate, register, values } = useForm({
    username: [
      required(),
      regexp("email", "Vui lòng nhập đúng định dạng Email"),
    ],
    password: [required(), minMax(6, 32)],
  });
  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      if (validate()) {
        await dispatch(loginThunkAction(values));
      }
    } catch (err) {
      handleError(err);
    }
  };
  const _copyToClipboard = async (ev) => {
    await copyToClipboard(ev.target.innerText);
    message.info("Copy to Clipboard");
  };
  return (
    <div className="col-12 col-md-6">
      {/* Card */}
      <div className="card card-lg mb-10 mb-md-0">
        <div className="card-body">
          {/* Heading */}
          <h6 className="mb-7">Returning Customer</h6>
          {/* Form */}
          <form>
            <div className="row">
              <div className="col-12">
                {/* Email */}
                <Field
                  placeholder="Email Address *"
                  required
                  {...register("username")}
                />
              </div>
              <div className="col-12">
                {/* Password */}
                <Field
                  placeholder="Password *"
                  type="password"
                  required
                  {...register("password")}
                />
              </div>
              <div className="col-12 col-md">
                {/* Remember */}
                <Field
                  {...register("rememberpassword")}
                  renderField={(props) => (
                    <Checkbox {...props}>Remember me</Checkbox>
                  )}
                />
              </div>
              <div className="col-12 col-md-auto">
                {/* Link */}
                <div className="form-group">
                  <a
                    className="font-size-sm text-reset cursor-pointer"
                    onClick={(ev) => {
                      ev.preventDefault(), setOpenForgotPasswordModal(true);
                    }}
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              <div className="col-12">
                {/* Button */}
                <Button
                  onClick={onSubmit}
                  className="btn btn-sm btn-dark"
                  type="submit"
                  loading={loginLoading}
                >
                  Sign In
                </Button>
              </div>
              <div className="col-12">
                <p className="font-size-sm text-muted mt-5 mb-2 font-light">
                  Tài khoản demo:{" "}
                  <b className="text-black">
                    <span
                      className="cursor-pointer underline"
                      onClick={_copyToClipboard}
                    >
                      demo@spacedev.com
                    </span>
                    /
                    <span
                      className="cursor-pointer underline"
                      onClick={_copyToClipboard}
                    >
                      Spacedev@123
                    </span>
                  </b>
                </p>
                <p className="font-size-sm text-muted mt-5 mb-2 font-light text-justify">
                  Chúng tôi cung cấp cho bạn tài khoản demo vì mục đích học tập,
                  để đảm bảo những người khác có thể sử dụng chung tài khoản
                  chúng tôi sẽ hạn chế rất nhiều quyền trên tài khoản này ví dụ:{" "}
                  <br />
                  - Không thay đổi thông tin cá nhân, mật khẩu <br />
                  - không reset password,... <br />
                  <br />
                  Để có thể sử dụng toàn bộ chức năng trên website, vui lòng
                  tiến hành <b className="text-black">đăng ký</b> bằng tài khoản
                  email có thật
                </p>
              </div>
            </div>
          </form>
          <ForgotPasswordModal
            open={openForgotPasswordModal}
            onCancel={() => setOpenForgotPasswordModal(false)}
            onOk={() => setOpenForgotPasswordModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
