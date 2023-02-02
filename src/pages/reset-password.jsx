import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { PATH } from "@/config/path";
import { useForm } from "@/hooks/useForm";
import { userService } from "@/services/user";
import { handleError } from "@/utils/handleError";
import { getToken, setToken, setUser } from "@/utils/token";
import { confirm, minMax, required } from "@/utils/validate";
import { message } from "antd";
import React from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const code = search.get("code");
  const { validate, register, values, reset } = useForm({
    password: [required(), minMax(6, 32)],
    confirmPassword: [required(), confirm("password")],
  });
  const onSubmit = async (ev) => {
    setLoading(true);
    ev.preventDefault();
    try {
      if (validate()) {
        const res = await userService.resetPasswordByCode({
          password: values.password,
          code,
        });
        setToken(res.data);
        navigate(PATH.account);
        reset();
        message.success("Bạn đã thay đổi mật khẩu thành công.");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handleError(err);
    }
  };
  return (
    <section className="py-12">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 offset-md-3">
            {/* Card */}
            <div className="card card-lg mb-10 mb-md-0">
              <div className="card-body">
                {/* Heading */}
                <h6 className="mb-7">Reset Password</h6>
                {/* Form */}
                <form>
                  <div className="row">
                    <div className="col-12">
                      {/* Email */}
                      <Field
                        type="password"
                        placeholder="Password *"
                        required
                        {...register("password")}
                      />
                    </div>
                    <div className="col-12">
                      {/* Password */}
                      <Field
                        type="password"
                        placeholder="Confirm Password *"
                        required
                        {...register("confirmPassword")}
                      />
                    </div>
                    <div className="col-12 col-md"></div>
                    <div className="col-12">
                      {/* Button */}
                      <Button loading={loading} onClick={onSubmit}>
                        Reset Password
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
