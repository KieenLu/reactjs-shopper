import React from "react";
import LoginPage from "./login";
import RegisterPage from "./register";
import { useBodyClass } from "@/hooks/useBodyClass";

const AuthPage = () => {
  useBodyClass("bg-light");
  return (
    <section className="py-12">
      <div className="container">
        <div className="row">
          <LoginPage />
          <RegisterPage />
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
