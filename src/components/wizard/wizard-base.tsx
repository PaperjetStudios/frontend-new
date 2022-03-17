import { Box, Grid, Stack, Step, StepLabel, Stepper } from "@mui/material";

import { useWizard } from "react-use-wizard";

import { StepperConnector } from "./stepper";
import { StepSetup } from "./types";

type StepProps = {
  handleCurrentStep: () => Promise<boolean>;
  stepSetup: StepSetup;
  unlocked: number;
  hideFooter?: boolean;
  sidebar?: React.ReactElement;
};

export const StepBox: React.FC<StepProps> = ({
  handleCurrentStep,
  stepSetup,
  unlocked,
  children,
  hideFooter = true,
  sidebar = null,
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
      <Box>
        {sidebar ? (
          <Grid
            container
            spacing={{
              xs: 2,
              md: 4,
              xl: 5,
            }}
            justifyContent="flex-start"
            sx={{
              pt: 4,
              pb: 3,
            }}
          >
            <Grid item sm={12} md={9} sx={{ pt: { xs: 5, md: 2 } }}>
              {children}
            </Grid>
            <Grid item sm={12} md={3} sx={{ position: "relative" }}>
              {sidebar}
            </Grid>
          </Grid>
        ) : (
          { children }
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
