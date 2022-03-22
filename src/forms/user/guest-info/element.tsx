import PJSTextInput from "../../inputs/textinput";

import { Box, Grid } from "@mui/material";

import { useFormContext } from "react-hook-form";
import PJSCheckbox from "../../inputs/checkbox";

type Props = {
  className?: string;
  style?: {};

  buttonEl: React.ReactElement;
};

const GuestFormElement: React.FC<Props> = ({ buttonEl }) => {
  const { watch, formState } = useFormContext(); // retrieve all hook methods

  const create_profile_checked = watch("create_profile_check");

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={3}>
        <Grid item md={6}>
          <PJSTextInput
            name="FirstName"
            label="First Name"
            error="Please insert your first name"
            placeholder="First Name"
          />
        </Grid>
        <Grid item md={6}>
          <PJSTextInput
            name="LastName"
            label="Last Name"
            error="Please insert your last name"
            placeholder="Last Name"
          />
        </Grid>
        <Grid item md={6}>
          <PJSTextInput
            name="Phone"
            label="Phone Number"
            error="Please insert your phone number"
            placeholder="Phone Number"
          />
        </Grid>
        <Grid item md={6}>
          <PJSTextInput
            name="email"
            label="Email"
            error="This address has already been used or is not valid"
            placeholder="Email Address"
          />
        </Grid>
      </Grid>
      <Box>
        <PJSCheckbox
          name="create_profile_check"
          error=""
          label="Create an account?"
        />
        {create_profile_checked && (
          <Grid container sx={{ mt: 2 }} rowSpacing={1} columnSpacing={3}>
            <Grid item md={6}>
              <PJSTextInput
                name="password"
                label="Password"
                error="Please insert a password"
                placeholder="Password"
                password
              />
            </Grid>
            <Grid item md={6}>
              <PJSTextInput
                name="confirm_password"
                label="Confirm Password"
                error="Please confirm your password"
                placeholder="Confirm Password"
                password
              />
            </Grid>
          </Grid>
        )}
      </Box>
      <Box>
        <PJSTextInput
          name="Street_Address_1"
          label="Street Address Line 1"
          error="Please insert a Street Address"
          placeholder="Street Address Line 1"
        />
        <PJSTextInput
          name="Street_Address_2"
          label="Street Address Line 2"
          error="Please insert a Street Address"
          placeholder="Street Address Line 2"
        />
        <PJSTextInput
          name="Suburb"
          label="Suburb"
          error="Please insert a Suburb"
          placeholder="Suburb"
        />
        <PJSTextInput
          name="City"
          label="City"
          error="Please insert a City"
          placeholder="City"
        />
        <PJSTextInput
          name="Country"
          label="Country"
          error="Please insert a Country"
          placeholder="Country"
        />
        <PJSTextInput
          name="Zip_Code"
          label="Zip Code"
          error="Please insert a Zip Code"
          placeholder="Zip Code"
        />
      </Box>
      {buttonEl}
    </>
  );
};

export default GuestFormElement;
