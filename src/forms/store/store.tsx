import classNames from "classnames";
import * as yup from "yup";
import Box from "../../components/box";
import { useEffect } from "react";

import PJSTextInput from "../inputs/textinput";
import Loader from "../../components/loader";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import colors from "../../theme/colors";
import useStore from "../../components/store/useStore";
import useUser from "../user/useUser";
import { StoreData } from "../../components/store/types";

import StoreAddressBlock from "./address";
import SocialBlock from "./social";

type Props = {
  className?: string;
  style?: {};
};

const schema = yup
  .object()
  .shape({
    Title: yup.string().required("Please insert a Title"),
    Description: yup.string().required("Please insert a Description"),
    Contact_Details: yup.object().shape({
      Email: yup.string().required("Please insert an Email Address"),
      Address: yup.object().shape({
        Street_Address_1: yup.string(),
        Street_Address_2: yup.string(),
        Suburb: yup.string(),
        City: yup.string(),
        Country: yup.string(),
        Zip_Code: yup.string(),
      }),
      Social: yup.array().of(
        yup.object().shape({
          Url: yup.string(),
          Type: yup.string(),
        })
      ),
    }),
    slug: yup.string(),
  })
  .required();

const StoreForm: React.FC<Props> = ({ children, className, style }) => {
  const { loadingStore, storeData, getStore, createStore, updateStore } =
    useStore();
  const { id } = useUser();

  const methods = useForm<StoreData>({
    defaultValues: {
      Title: storeData?.Title ? storeData?.Title : "",
      Description: storeData?.Description ? storeData?.Description : "",
      slug: storeData?.slug ? storeData?.slug : "",
      Rating: storeData?.Rating ? storeData?.Rating : null,
      Gallery: storeData?.Gallery,
      Contact_Details: {
        Address: {
          Street_Address_1: storeData?.Contact_Details?.Address.Street_Address_1
            ? storeData?.Contact_Details?.Address.Street_Address_1
            : "",
          Street_Address_2: storeData?.Contact_Details?.Address.Street_Address_2
            ? storeData?.Contact_Details?.Address.Street_Address_2
            : "",
          Suburb: storeData?.Contact_Details?.Address.Suburb
            ? storeData?.Contact_Details?.Address.Suburb
            : "",
          City: storeData?.Contact_Details?.Address.City
            ? storeData?.Contact_Details?.Address.City
            : "",
          Country: storeData?.Contact_Details?.Address.Country
            ? storeData?.Contact_Details?.Address.Country
            : "",
          Zip_Code: storeData?.Contact_Details?.Address.Zip_Code
            ? storeData?.Contact_Details?.Address.Zip_Code
            : "",
        },
        Email: storeData?.Contact_Details?.Email
          ? storeData?.Contact_Details?.Email
          : "",
        Social:
          storeData?.Contact_Details?.Social.length > 0
            ? storeData?.Contact_Details?.Social
            : [{ Url: "", Type: "" }],
      },
    },
    resolver: yupResolver(schema),
  });

  console.log("Form Errors: ", methods.formState?.errors);
  console.log("Store Data: ", storeData);

  useEffect(() => {
    if (storeData) {
      methods.reset(storeData);
      console.log(storeData);
    }
    return null;
  }, [storeData, methods]);

  useEffect(() => {
    if (id) {
      if (!storeData) {
        // Get user's store data
        getStore({
          variables: {
            id: id,
          },
        });
      }
    }
  }, [storeData]);

  if (loadingStore) {
    return <Loader />;
  }

  const submit: SubmitHandler<StoreData> = (data) => {
    if (storeData) {
      console.log("(Update) submit data: ", data);
      try {
        updateStore({
          variables: {
            ...data.Contact_Details.Address,
            ...data.Gallery,
            Social: [...data.Contact_Details.Social],
            Email: data.Contact_Details.Email,
            Title: data.Title,
            Description: data.Description,
            Rating: data.Rating,
            slug: data.slug,
            userID: id,
          },
        });
      } catch (e) {
        console.log("OnSubmit Update Store Error: ", e);
      }
    } else {
      console.log("(Create) submit data: ", data);
      try {
        createStore({
          variables: {
            ...data.Contact_Details.Address,
            ...data.Gallery,
            Social: [...data.Contact_Details.Social],
            Email: data.Contact_Details.Email,
            Title: data.Title,
            Description: data.Description,
            Rating: data.Rating,
            slug: data.slug,
            seller: id,
          },
        });
      } catch (e) {
        console.log("OnSubmit Create Store Error: ", e);
      }
    }
  };

  return (
    <Box style={style} className={classNames(className ? className : "")}>
      <FormProvider {...methods}>
        <form
          className={classNames(
            className ? className : "",
            "flex flex-col p-5"
          )}
          onSubmit={methods.handleSubmit(submit)}
        >
          <PJSTextInput
            name="Title"
            label="Title"
            error={methods.formState?.errors?.Title?.message}
            placeholder="Title"
          />

          <PJSTextInput
            name="Description"
            label="Description"
            multiline
            error={methods.formState?.errors?.Description?.message}
            placeholder="Description"
          />

          <Box className="md:grid md:grid-cols-3 gap-5">
            <PJSTextInput
              name="Contact_Details.Email"
              label="Contact Email"
              error={methods.formState?.errors?.Contact_Details?.Email?.message}
              placeholder="Email Address"
            />
          </Box>

          <StoreAddressBlock />
          <SocialBlock />

          <Button
            type="submit"
            sx={{ color: colors.light, backgroundColor: colors.primary }}
          >
            {loadingStore ? (
              <Loader />
            ) : storeData ? (
              "Update Store"
            ) : (
              "Create Store"
            )}
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
};

export default StoreForm;
