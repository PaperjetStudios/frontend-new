import PJSTextInput from "../../inputs/textinput";
import { Grid } from "@mui/material";

type Props = {
  className?: string;
  style?: {};
  onSubmit: any;
  buttonEl: React.ReactElement;
};

const ProfileFormElement: React.FC<Props> = ({ buttonEl, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
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
      {buttonEl}
    </form>
  );
};

export default ProfileFormElement;
