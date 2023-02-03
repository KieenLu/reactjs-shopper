import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { Form } from "@/components/Form";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { useQuery } from "@/hooks/useQuery";
import { useScrollTop } from "@/hooks/useScrollTop";
import { organizationService } from "@/services/organization";
import { handleError } from "@/utils/handleError";
import { regexp, required } from "@/utils/validate";
import { message } from "antd";
import { Helmet } from "react-helmet";

const ContactPage = () => {
  useScrollTop();
  const { user } = useAuth();
  const rules = {
    name: [required()],
    username: [required()],
    phone: [
      required(),
      regexp("phone", "Vui lòng nhập đúng định dạng số điện thoại"),
    ],
    title: [required()],
    content: [required()],
    fb: [required(), regexp("fb", "Vui lòng nhập đúng URL Facebook của bạn")],
  };
  const { refetch: contactService, loading: contactLoading } = useQuery({
    queryFn: ({ params }) => organizationService.contact(...params),
    enabled: false,
  });
  const onSubmit = async (values) => {
    try {
      await contactService({
        name: values.name,
        email: values.username,
        phone: values.phone,
        fb: values.fb,
        title: values.title,
        content: values.content,
      });
      // if (contactForm.validate()) {
      //   console.log("object");
      // }
      message.success(
        "Đã gửi thông tin liên hệ thành công. Chúng thôi sẽ liên lạc với bạn trong thời gian sớm nhất có thể"
      );
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Liên hệ</title>
      </Helmet>
      <nav className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Breadcrumb */}
              <ol className="breadcrumb mb-0 font-size-xs text-gray-400">
                <li className="breadcrumb-item">
                  <a className="text-gray-400" href="index.html">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item active">Contact Us</li>
              </ol>
            </div>
          </div>
        </div>
      </nav>
      {/* CONTENT */}
      <section className="pt-7 pb-12">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Heading */}
              <h3 className="mb-10 text-center">Contact Us</h3>
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-12 col-md-4 col-xl-3">
              <aside className="mb-9 mb-md-0">
                {/* Heading */}
                <h6 className="mb-6">
                  <i className="fe fe-phone text-primary mr-4" /> Call to Us:
                </h6>
                {/* Text */}
                <p className="text-gray-500">
                  We're available from 10 am - 10 pm EST, 7 days a week.
                </p>
                <p>
                  <strong>Customer Service:</strong>
                  <br />
                  <a className="text-gray-500" href="tel:60146-389-574">
                    6-146-389-574
                  </a>
                </p>
                <p className="mb-0">
                  <strong>Careers:</strong>
                  <br />
                  <a className="text-gray-500" href="tel:60146-389-574">
                    6-146-389-574
                  </a>
                </p>
                {/* Divider */}
                <hr />
                {/* Heading */}
                <h6 className="mb-6">
                  <i className="fe fe-mail text-primary mr-4" /> Write to Us:
                </h6>
                {/* Text */}
                <p className="text-gray-500">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p>
                  <strong>Customer Service:</strong>
                  <br />
                  <a
                    className="text-gray-500"
                    href="mailto:customer@example.com"
                  >
                    customer@example.com
                  </a>
                </p>
                <p className="mb-0">
                  <strong>Careers:</strong>
                  <br />
                  <a
                    className="text-gray-500"
                    href="mailto:careers@example.com"
                  >
                    careers@example.com
                  </a>
                </p>
                {/* Divider */}
                <hr />
                {/* Heading */}
                <h6 className="mb-6">
                  <i className="fe fe-mail text-primary mr-4" /> Find Us:
                </h6>
                {/* Text */}
                <p className="mb-0 text-gray-500">
                  Want to visit our Offline Stores?
                </p>
                {/* Button */}
                <p className="mb-0">
                  <a
                    className="btn btn-link px-0 text-body"
                    href="store-locator.html"
                  >
                    Go to Store Locator <i className="fe fe-arrow-right ml-2" />
                  </a>
                </p>
              </aside>
            </div>
            <div className="col-12 col-md-8">
              <Form form={{ rules, initialValue: user }} onSubmit={onSubmit}>
                <Form.Item name="name">
                  <Field placeholder="Họ và Tên . . ." />
                </Form.Item>
                <Form.Item name="username">
                  <Field placeholder="Địa chỉ Email . . ." />
                </Form.Item>
                <Form.Item name="phone">
                  <Field placeholder="Số điện thoại . . ." />
                </Form.Item>
                <Form.Item name="fb">
                  <Field placeholder="URL Facebook . . ." />
                </Form.Item>
                <Form.Item name="title">
                  <Field placeholder="Tiêu đề . . ." />
                </Form.Item>
                <Form.Item name="content">
                  <Field
                    placeholder="Nội dung . . ."
                    renderField={(props) => (
                      <textarea
                        className="form-control form-control-sm"
                        id="contactMessage"
                        style={{ width: "100%" }}
                        {...props}
                        rows={5}
                      />
                    )}
                  />
                </Form.Item>
                <Button loading={contactLoading}>Gửi</Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
