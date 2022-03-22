import {
  Alert,
  Box,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";

import { useWizard } from "react-use-wizard";

import { StepperConnector } from "./stepper";
import { StepSetup } from "./types";

type StepProps = {
  handleCurrentStep?: () => Promise<boolean>;
  stepSetup: StepSetup;
  unlocked: number;
  hideFooter?: boolean;
  sidebar?: React.ReactElement;
  error?: string[];
};

export const StepBox: React.FC<StepProps> = ({
  handleCurrentStep,
  stepSetup,
  unlocked,
  children,
  hideFooter = true,
  sidebar = null,
  error = "",
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

  if (handleCurrentStep) {
    handleStep(() => handleCurrentStep());
  }

  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        sx={{ pt: 7 }}
        alternativeLabel
        activeStep={activeStep}
        connector={<StepperConnector />}
      >
        {stepSetup.Steps.map((label, index) => (
          <Step
            key={label}
            onClick={() => {
              if (unlocked >= index) {
                goToStep(index);
              }
            }}
          >
            <StepLabel StepIconComponent={stepSetup.Icons}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box>
        {sidebar !== null ? (
          <Grid
            container
            spacing={{
              xs: 2,
              md: 4,
              xl: 5,
            }}
            justifyContent="flex-start"
            sx={{
              pt: error !== "" ? 0 : 4,
              pb: 3,
            }}
          >
            <Grid item xs={12} md={9} sx={{ pt: { xs: 5, md: 2 } }}>
              {children}
            </Grid>
            <Grid item xs={12} md={3} sx={{ position: "relative" }}>
              {sidebar}
            </Grid>
          </Grid>
        ) : (
          <>{children}</>
        )}
      </Box>
      {!hideFooter && (
        <Box>
          {!isFirstStep && (
            <button onClick={() => previousStep()}>Previous</button>
          )}
          {!isLastStep && <button onClick={() => nextStep()}>Next</button>}
        </Box>
      )}
    </Stack>
  );
};
