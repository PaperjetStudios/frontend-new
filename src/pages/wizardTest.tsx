import { Button, Typography } from "@mui/material";
import BasePage from "./layout/base-page";
import { Wizard, useWizard } from "react-use-wizard";
import Box from "../components/box";
import { useState } from "react";

type Props = {};

const WizardTest: React.FC<Props> = ({ children }) => (
  <BasePage slug="home">
    <Wizard>
      <Step1 />
      <Box>
        <Typography variant="h1">Step 2</Typography>
      </Box>
      <Box>
        <Typography variant="h1">Step 3</Typography>
      </Box>
    </Wizard>
  </BasePage>
);

export default WizardTest;

const Step1: React.FC = () => {
  const { handleStep, previousStep, nextStep } = useWizard();
  const [ticked, setTicked] = useState(false);

  // Return promise
  handleStep(() => {
    return new Promise<boolean>((resolve, reject) => {
      if (ticked) {
        resolve(true);
      } else {
        reject("Not ticked");
      }
    });
  });

  return (
    <>
      <Typography variant="h6">Step 1</Typography>
      <button onClick={() => setTicked(!ticked)}>
        Tick me {ticked ? "ticked" : "notTicked"}
      </button>
      <button onClick={() => previousStep()}>Previous</button>
      <button onClick={() => nextStep()}>Next</button>
    </>
  );
};
