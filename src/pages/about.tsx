import BasePage from "./layout/base-page";

type Props = {};

const About: React.FC<Props> = ({ children }) => (
  <BasePage slug="about">
    about
    {children}
  </BasePage>
);

export default About;
