import { Box, Stack, Step, StepLabel, Stepper } from "@mui/material";

import { useWizard } from "react-use-wizard";

import { StepperConnector } from "./stepper";
import { StepSetup } from "./types";

type StepProps = {
  handleCurrentStep: () => Promise<boolean>;
  stepSetup: StepSetup;
  unlocked: number;
};

export const StepBox: React.FC<StepProps> = ({
  handleCurrentStep,
  stepSetup,
  unlocked,
  children,
}) => {
  const {
    handleStep,
    previousStep,
    nextStep,
    activeStep,
    goToStep,
    isFirstStep,
    isLastStep,
  } = useWizard();

  handleStep(() => handleCurrentStep());

  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<StepperConnector />}
      >
        {stepSetup.Steps.map((label, index) => (
          <Step
            key={label}
            onClick={() => {
              console.log("Unlocked", unlocked);
              console.log("index", index);
              if (unlocked >= index) {
                goToStep(index);
              }
            }}
          >
            <StepLabel StepIconComponent={stepSetup.Icons}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>{children}</Box>
      <Box>
        {!isFirstStep && (
          <button onClick={() => previousStep()}>Previous</button>
        )}
        {!isLastStep && <button onClick={() => nextStep()}>Next</button>}
      </Box>
    </Stack>
  );
};
