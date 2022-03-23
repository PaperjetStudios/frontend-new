import { useNavigate } from "react-router-dom";
import Box from "../../components/box";
import PJSTabs from "../../components/tabs";

import LoginForm from "../../forms/user/login";
import RegisterForm from "../../forms/user/register";
import BasePage from "../layout/base-page";

type Props = {};

const LoginRegisterPage: React.FC<Props> = ({ children }) => {
  const navigator = useNavigate();
  return (
    <BasePage slug="login-register">
      <Box wrapper hcenter wrapperHCenter className="mt-5">
        <Box className="w-full lg:w-1/3">
          <PJSTabs
            tabs={[
              {
                title: "Login",
                content: (
                  <LoginForm
                    onSubmit={() => {
                      navigator("/profile", { replace: true });
                    }}
                  />
                ),
              },
              {
                title: "Register",
                content: (
                  <RegisterForm
                    onSubmit={() => {
                      navigator("/login-register", { replace: true });
                    }}
                  />
                ),
              },
            ]}
          />
        </Box>
      </Box>
    </BasePage>
  );
};

export default LoginRegisterPage;
