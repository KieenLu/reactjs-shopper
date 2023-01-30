import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { Form } from "@/components/Form";
import { Radio } from "@/components/Radio";
import { UploadFile } from "@/components/UploadFile";
import { avatarDefault } from "@/config/asssets";
import { MESSAGE } from "@/config/message";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@/hooks/useQuery";
import { fileService } from "@/services/file";
import { userService } from "@/services/user";
import { setUserAction } from "@/stories/auth";
import { handleError } from "@/utils/handleError";
import { isEqual } from "@/utils/isEqual";
import { confirm, minMax, regexp, required, validate } from "@/utils/validate";
import { message } from "antd";
import { useRef } from "react";
import { useDispatch } from "react-redux";

export const Profile = () => {
  const { user } = useAuth();
  const rules = {
    name: [required()],
    phone: [
      required(),
      regexp("phone", "Vui lòng nhập đúng định dạng số điện thoại"),
    ],
    currentPassword: [
      (_, values) => {
        if (values.newPassword) {
          const errorObj = validate(
            {
              currentPassword: [required(), minMax(6, 32)],
            },
            values
          );
          return errorObj.currentPassword;
        }
      },
    ],
    newPassword: [
      (value, values) => {
        if (values.currentPassword) {
          if (value === values.currentPassword)
            return "Vui lòng không điền giống mật khẩu cũ";
          const errorObj = validate(
            {
              newPassword: [required(), minMax(6, 32)],
            },
            values
          );
          return errorObj.newPassword;
        }
      },
    ],
    confirmPassword: [confirm("newPassword")],
  };
  const dispatch = useDispatch();
  const fileRef = useRef();
  const { refetch: updateProfileService, loading: updateProfileLoading } =
    useQuery({
      queryFn: ({ params }) => userService.updateInfo(...params),
      enabled: false,
    });
  const { refetch: changePasswordService, loading: changePasswordLoading } =
    useQuery({
      queryFn: ({ params }) => userService.changePassword(...params),
      enabled: false,
    });
  const { refetch: uploadFileService, loading: uploadFileLoading } = useQuery({
    queryFn: ({ params }) => fileService.uploadFile(...params),
    enabled: false,
  });
  const onSubmit = async (values, form) => {
    let avatar;
    try {
      if (fileRef.current) {
        const res = await uploadFileService(fileRef.current);
        avatar = res.link;
      }
    } catch (err) {
      console.error(err);
      handleError(err);
      return;
    }
    if (
      avatar ||
      !isEqual(values, user, "phone", "name", "birthday", "gender")
    ) {
      updateProfileService({
        phone: values.phone,
        name: values.name,
        birthday: values.birthday,
        gender: values.gender,
        avatar,
      })
        .then((res) => {
          dispatch(setUserAction(res.data));
          message.success(MESSAGE.UPDATE_PROFILE_SUCCESS);
          fileRef.current = null;
        })
        .catch(handleError);
    } else if (!values.newPassword) {
      message.warning(MESSAGE.WARNING_NOTHING_CHANGE);
    }
    if (values.newPassword) {
      changePasswordService({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
        .then((res) => {
          form.setValues({
            ...user,
            newPassword: "",
            currentPassword: "",
            confirmPassword: "",
          });
          message.success(MESSAGE.CHANGE_PASSWORD_SUCCESS);
        })
        .catch(handleError);
    }
  };

  return (
    <Form
      form={{
        rules,
        initialValue: user,
        dependencies: {
          currentPassword: ["newPassword"],
          newPassword: ["currentPassword", "confirmPassword"],
        },
      }}
      rules={rules}
      onSubmit={onSubmit}
    >
      <div className="row">
        <div className="col-12">
          <div className="profile-avatar">
            <UploadFile onChange={(file) => (fileRef.current = file)}>
              {({ previewSrc, triggerEvent }) => (
                <div className="wrap" onClick={triggerEvent}>
                  <img src={previewSrc || user.avatar || avatarDefault} />
                  <i className="icon">
                    <img src="./img/icons/icon-camera.svg" />
                  </i>
                </div>
              )}
            </UploadFile>
          </div>
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
              label="Current Password"
              type="password"
              placeholder="Current Password . . . "
            />
          </Form.Item>
        </div>
        <div className="col-12 col-md-6">
          <Form.Item name="newPassword">
            <Field
              label="New Password"
              type="password"
              placeholder="New Password . . . "
            />
          </Form.Item>
        </div>
        <div className="col-12 col-md-6">
          <Form.Item name="confirmPassword">
            <Field
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password . . . "
            />
          </Form.Item>
        </div>
        <div className="col-12 col-md-6">
          <Form.Item name="birthday">
            <Field label="Day of Birthday" type="date" />
          </Form.Item>
        </div>
        <div className="col-12 col-md-6">
          {/* Gender */}
          <Form.Item name="gender">
            <Field
              label="Gender"
              renderField={(props) => (
                <Radio.Group {...props} toggle>
                  <Radio.Toggle value="male">Male</Radio.Toggle>
                  <Radio.Toggle value="female">Female</Radio.Toggle>
                </Radio.Group>
              )}
            />
          </Form.Item>
        </div>
        <div className="col-12">
          {/* Button */}
          <Button
            loading={
              uploadFileLoading || changePasswordLoading || updateProfileLoading
            }
          >
            {" "}
            Save Changes
          </Button>
        </div>
      </div>
    </Form>
  );
};
export default Profile;
