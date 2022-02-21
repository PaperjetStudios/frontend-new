import Box from "../../components/box";
import PJSTabs from "../../components/tabs";

import LoginForm from "../../forms/user/login";
import BasePage from "../layout/base-page";

type Props = {};

const LoginRegisterPage: React.FC<Props> = ({ children }) => (
  <BasePage slug="login-register">
    <Box wrapper hcenter wrapperHCenter className="mt-5">
      <Box className="w-full lg:w-1/3">
        <PJSTabs
          tabs={[
            {
              title: "Login",
              content: <LoginForm />,
            },
            {
              title: "Register",
              content: <LoginForm />,
            },
          ]}
        />
      </Box>
    </Box>
  </BasePage>
);

export default LoginRegisterPage;
