import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { required } from "@/utils/validate";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { user } = useAuth();

  const { validate, register, values } = useForm(
    {
      name: [required()],
    },
    user?.data || user
  );
  return (
    <form>
      <div className="row">
        <div className="col-12">
          <div className="profile-avatar"></div>
        </div>
        <div className="col-12">
          {/* Full Name */}
          <Field
            {...register("name")}
            placeholder="Full Name"
            label="Full Name *"
          />
        </div>
        <div className="col-12 col-md-6">
          {/* Email */}
          <Field label="Number Phone*" {...register("phone")} />
        </div>
        <div className="col-12 col-md-6">
          {/* Email */}
          <Field label="Email Address *" disabled {...register("username")} />
        </div>
        <div className="col-12">
          {/* Password */}
          <Field
            label="Current Password"
            type="password"
            placeholder="Current Password"
            {...register("currentPassword")}
          />
        </div>
        <div className="col-12 col-md-6">
          <Field
            label="New Password"
            type="password"
            placeholder="New Password"
            {...register("newPassword")}
          />
        </div>
        <div className="col-12 col-md-6">
          <Field
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
        </div>
        <div className="col-12 col-lg-6">
          <Field label="Date of Birth" type="date" {...register("birthday")} />
        </div>
        <div className="col-12 col-lg-6">
          {/* Gender */}
          <div className="form-group mb-8"></div>
        </div>
        <div className="col-12">
          {/* Button */}
          <Button>Save Changes</Button>
        </div>
      </div>
    </form>
  );
};
export default Profile;
