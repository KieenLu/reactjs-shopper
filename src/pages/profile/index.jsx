import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { Form } from "@/components/Form";
import { useAuth } from "@/hooks/useAuth";
import { regexp, required } from "@/utils/validate";

export const Profile = () => {
  const { user } = useAuth();
  const rules = {
    fullName: [required()],
    phone: [
      required(),
      regexp("phone", "Vui lòng nhập đúng định dạng số điện thoại"),
    ],
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log("object");
  };

  return (
    <Form form={{ rules, initialValue: user }} onSubmit={onSubmit}>
      <div className="row">
        <div className="col-12">
          <div className="profile-avatar"></div>
        </div>
        <div className="col-12">
          {/* Full Name */}
          <Form.Item name="name">
            <Field label="Full Name *" placeholder="Full Name . . . " />
          </Form.Item>
        </div>
        <div className="col-12 col-md-6">
          {/* Phone */}
          <Form.Item name="phone">
            <Field label="Number Phone *" placeholder="Number Phone . . . " />
          </Form.Item>
        </div>
        <div className="col-12 col-md-6">
          {/* Email */}
          <Form.Item name="username">
            <Field
              label="Email *"
              disabled
              placeholder="Email Address . . . "
            />
          </Form.Item>
        </div>
        <div className="col-12">
          <Form.Item name="currentPassword">
            <Field
              label="Current Password *"
              placeholder="Current Password . . . "
            />
          </Form.Item>
        </div>
        <div className="col-12 col-md-6">
          <Form.Item name="confirmPassword">
            <Field
              label="Confirm Password *"
              placeholder="Confirm Password . . . "
            />
          </Form.Item>
        </div>
        <div className="col-12 col-md-6">
          <Form.Item name="newPassword">
            <Field label="New Password *" placeholder="New Password . . . " />
          </Form.Item>
        </div>
        <div className="col-12 col-md-6">
          <Form.Item name="birthday">
            <Field label="Birthday *" type="date" />
          </Form.Item>
        </div>
        <div className="col-12 col-lg-6">
          {/* Gender */}
          <div className="form-group mb-8"></div>
        </div>
        <div className="col-12">
          {/* Button */}
          <Button onClick={onSubmit}> Save Changes</Button>
        </div>
      </div>
    </Form>
  );
};
export default Profile;
