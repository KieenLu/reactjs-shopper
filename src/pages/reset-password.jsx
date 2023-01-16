import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { useForm } from "@/hooks/useForm";
import { userService } from "@/services/user";
import { handleError } from "@/utils/handleError";
import { confirm, minMax, required } from "@/utils/validate";
import React from "react";
import { useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const [search] = useSearchParams();
  const code = search.get("code");
  const { validate, register, values } = useForm({
    password: [required(), minMax(6, 32)],
    confirmPassword: [required(), confirm("password")],
  });
  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      if (validate()) {
      }
    } catch (err) {
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
                        placeholder="Password *"
                        required
                        {...register("password")}
                      />
                    </div>
                    <div className="col-12">
                      {/* Password */}
                      <Field
                        placeholder="Confirm Password *"
                        required
                        {...register("confirmPassword")}
                      />
                    </div>
                    <div className="col-12 col-md"></div>
                    <div className="col-12">
                      {/* Button */}
                      <Button onClick={onSubmit}>Reset Password</Button>
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
