import { useNavigate } from "react-router-dom";
import Box from "../components/box";
import PJSTabs from "../components/tabs";
import LoginForm from "../forms/user/login";
import RegisterForm from "../forms/user/register";

import BaseModal from "../modal/base-modal";

import { ModalProps } from "./types";

const LoginModal: React.FC<ModalProps> = ({ showing, toggle, trigger }) => {
  const navigator = useNavigate();
  return (
    <BaseModal showing={showing} toggle={toggle} trigger="login_register">
      <PJSTabs
        tabs={[
          {
            title: "Login",
            content: (
              <LoginForm
                onSubmit={() => {
                  toggle(false);
                  navigator("/profile");
                }}
              />
            ),
          },
          {
            title: "Register",
            content: (
              <RegisterForm
                onSubmit={() => {
                  toggle(false);
                  navigator("/login-register", { replace: true });
                }}
              />
            ),
          },
        ]}
      />
    </BaseModal>
  );
};

export default LoginModal;
