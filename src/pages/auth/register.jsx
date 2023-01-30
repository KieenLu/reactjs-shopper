import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { useForm } from "@/hooks/useForm";
import { useQuery } from "@/hooks/useQuery";
import { userService } from "@/services/user";
import { handleError } from "@/utils/handleError";
import { confirm, minMax, regexp, required } from "@/utils/validate";
import { message } from "antd";
import { useDispatch } from "react-redux";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { validate, register, values, reset } = useForm({
    name: [required()],
    username: [
      required(),
      regexp("email", "Vui lòng nhập đúng định dạng Email"),
    ],
    password: [required(), minMax(6, 32)],
    confirmPassword: [required(), confirm("password")],
  });
  const { refetch: registerService, loading: registerLoading } = useQuery({
    queryFn: ({ params }) => userService.signup(...params),
    enabled: false,
  });
  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      if (validate()) {
        // await dispatch(registerThunkAction(values));
        await registerService(values);
        message.success(
          "Đăng ký tài khoản thành công, hãy xác nhận tài khoản thông qua Email đăng ký của bạn"
        );
        reset();
      }
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div className="col-12 col-md-6">
      {/* Card */}
      <div className="card card-lg">
        <div className="card-body">
          {/* Heading */}
          <h6 className="mb-7">New Customer</h6>
          {/* Form */}
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-12">
                {/* Email */}
                <Field
                  placeholder="Full Name *"
                  required
                  {...register("name")}
                />
              </div>
              <div className="col-12">
                {/* Email */}
                <Field
                  placeholder="Email Address *"
                  required
                  {...register("username")}
                />
              </div>
              <div className="col-12 col-md-6">
                {/* Password */}
                <Field
                  placeholder="Password *"
                  required
                  type="password"
                  {...register("password")}
                />
              </div>
              <div className="col-12 col-md-6">
                {/* Password */}
                <Field
                  placeholder="Confirm Password *"
                  required
                  type="password"
                  {...register("confirmPassword")}
                />
              </div>
              <div className="col-12 col-md-auto">
                {/* Link */}
                <div className="form-group font-size-sm text-muted">
                  By registering your details, you agree with our Terms &amp;
                  Conditions, and Privacy and Cookie Policy.
                </div>
              </div>
              <div className="col-12 col-md">{/* Newsletter */}</div>
              <div className="col-12">
                {/* Button */}
                <Button loading={registerLoading} onClick={onSubmit}>
                  Register
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
