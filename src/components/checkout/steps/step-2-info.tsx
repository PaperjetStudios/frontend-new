import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Stack, Typography } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useWizard } from "react-use-wizard";

import AddressList from "../../../forms/user/address/address-list";
import GuestInformationForm from "../../../forms/user/guest-info/guest-info";
import { schema } from "../../../forms/user/guest-info/schema";
import { empty, FormType } from "../../../forms/user/guest-info/types";
import ProfileForm from "../../../forms/user/profile/profile";
import { cartState, setGuest } from "../../../state/cart";

import { checkoutState } from "../../../state/checkout";
import useLoggedIn from "../../auth/isLoggedIn";
import ShadowContainer from "../../common/shadow-container";
import useErrors from "../../wizard/useErrors";
import { StepBox } from "../../wizard/wizard-base";
import { StepElementProps } from "../types";
import Totals from "./common/totals";

const errors = {
  noAddress: "Please add an address",
  information: "Please add your details",
};

const Step2Info: React.FC<StepElementProps> = ({ setup }) => {
  const [checkout, setCheckout] = checkoutState.use();
  const { isLoggedIn } = useLoggedIn();
  const [cart] = cartState.use();

  const [hasAddressSelected, setAddressSelected] = useState(false);

  const { errorData, addError, clearErrors, removeError } = useErrors();
  const { nextStep } = useWizard();

  // Return promise
  const handleCurrentStep = () => {
    if (hasAddressSelected) {
      clearErrors();
    } else {
      if (isLoggedIn) {
        addError(errors.noAddress, true);
      } else {
        addError(errors.information, true);
      }
    }
    return new Promise<boolean>((resolve, reject) => {
      if (hasAddressSelected) {
        resolve(true);
        if (checkout.unlockedSteps < 2) {
          setCheckout((prevState) => ({
            ...prevState,
            unlockedSteps: 2,
          }));
        }
      } else {
        reject("Not Valid");
      }
    });
  };

  const ErrorView = () => {
    if (errorData.errors.length > 0) {
      return (
        <Stack sx={{ gap: "10px", pb: 3 }}>
          {errorData.errors.map((obj, ind) => {
            return (
              <Alert
                key={`${ind}`}
                severity={obj.type}
                onClick={() => {
                  removeError(obj.message);
                }}
              >
                {obj.message}
              </Alert>
            );
          })}
        </Stack>
      );
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    // validation
    if (isLoggedIn) {
      if (cart.address.selectedId === -1) {
        setAddressSelected(false);
      } else {
        setAddressSelected(true);
      }
    } else {
      console.log(cart.guest);
      if (!_.isEqual(cart.guest, empty)) {
        setAddressSelected(true);
      } else {
        setAddressSelected(true);
      }
    }
  }, [cart, isLoggedIn]);

  const methods = useForm<FormType>({
    defaultValues: cart.guest,
    resolver: yupResolver(schema),
  });

  const submit: SubmitHandler<FormType> = (data) => {
    console.log("data", data);
    try {
      setGuest({ ...data, guestProfile: true });
    } catch (e) {
      console.log(e);
    }
    nextStep();
  };

  const formRef = useRef(null);

  return (
    <FormProvider {...methods}>
      <StepBox
        unlocked={checkout.unlockedSteps}
        stepSetup={setup}
        handleCurrentStep={handleCurrentStep}
        sidebar={
          <Totals
            nextAction={() => {
              if (!isLoggedIn) {
                formRef.current.dispatchEvent(
                  new Event("submit", { bubbles: true, cancelable: true })
                );
              } else {
                nextStep();
              }
            }}
          />
        }
      >
        <ShadowContainer sx={{ p: 5 }}>
          {<ErrorView />}
          {isLoggedIn && (
            <>
              <Typography variant="h6" sx={{ pb: 5 }}>
                Your Information
              </Typography>
              <ProfileForm buttonText="update" />
              <Typography variant="h6" sx={{ pt: 5, pb: 2 }}>
                Your Address
              </Typography>
              <AddressList />
            </>
          )}
          {!isLoggedIn && (
            <>
              <Typography variant="h6" sx={{ pb: 3 }}>
                Your Information
              </Typography>

              <form ref={formRef} onSubmit={methods.handleSubmit(submit)}>
                <GuestInformationForm methods={methods} />
              </form>
            </>
          )}
        </ShadowContainer>
      </StepBox>
    </FormProvider>
  );
};

export default Step2Info;
