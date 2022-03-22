import { useEffect } from "react";

import {
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";

import { FormType } from "./types";

import colors from "../../../theme/colors";
import { schema } from "./schema";
import GuestFormElement from "./element";
import { cartState, setGuest } from "../../../state/cart";

type Props = {
  methods: UseFormReturn<FormType, object>;
};

const GuestInformationForm: React.FC<Props> = ({ methods }) => {
  const [cart] = cartState.use();

  useEffect(() => {
    methods.reset(cart.guest);
  }, [cart, methods]);

  return (
    <Box>
      <GuestFormElement
        buttonEl={
          <Button
            type="submit"
            sx={{
              color: colors.light,
              px: 5,
              py: 1,
              backgroundColor: colors.primary,
            }}
          >
            Confirm Details
          </Button>
        }
      />
    </Box>
  );
};

export default GuestInformationForm;
