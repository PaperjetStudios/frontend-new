import React, { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";
import {
  ApolloError,
  useQuery,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
// Import Form Libraries
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
// Import Queries
import {
  GET_STORE_BY_ID,
  GET_STORE_BY_USER_ID,
  CREATE_STORE,
  UPDATE_STORE,
  UPLOAD_MULTIPLE_FILES,
  CHECK_DUPLICATE_FILES,
} from "../../components/store/queries";
// Import Utility Functions And Variables
import { checkRouteMatch } from "../../util/routes";
import { compressImage } from "../../util/files";
import { currentApi } from "../../config/config";
import colors from "../../theme/colors";
// Import Custom Hooks
import useUser from "../user/useUser";
// Import MaterialUI Components
import { Button, Box as BoxMUI } from "@mui/material";
// Import Custom React Components
import Box from "../../components/box";
import PJSTextInput from "../inputs/textinput";
import Loader from "../../components/loader";
import StoreAddressBlock from "./address";
import SocialBlock from "./social";
import ImagesWidget from "./imagesWidget";
import Typo from "../../components/typo";
import TabHeader from "../../components/store/tabHeader";
import NoStoreFound from "./no-store-found";
// Import Types
import { StoreData } from "../../components/store/types";
import { Icons } from "../../components/icons";

type Props = {
  className?: string;
  style?: {};
  disabled?: boolean;
  mode?: "create" | "edit";
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
          Url: yup.string().required("Please enter social media link Url"),
          Type: yup.string().required("Please select social media platform"),
        })
      ),
    }),
    Featured_Image: yup
      .array()
      .min(1, "Please select atleast one image")
      .required("required"),
    Gallery: yup
      .array()
      .min(1, "Please select atleast one image")
      .required("required"),
  })
  .required();

const StoreForm: React.FC<Props> = ({
  children,
  className,
  style,
  disabled = false,
  mode,
}) => {
  const { id, userData, loadingUser } = useUser();
  const [storeData, setStoreData] = useState<StoreData | null>();
  const [loadingStore, setLoadingStore] = useState(true);
  const [storeID, setStoreID] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading data");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // ------------------------------------------------------------------------
  // Define queries and mutations
  // ------------------------------------------------------------------------

  // Define getStore query
  const {
    loading,
    error,
    data: getStoreData,
  } = useQuery(GET_STORE_BY_USER_ID, {
    skip: id && (mode === "edit" || mode === undefined) ? false : true,
    variables: {
      id: id,
    },
    onCompleted: (data) => {
      if (data.findMyStore.data) {
        console.log("GetStore data", data);
        setStoreData(data.findMyStore.data.attributes);
        setStoreID(data.findMyStore.data.id);
      }
    },
    onError: (error: ApolloError) => {
      console.log(error);
      setStoreData(undefined);
      setLoadingStore(false);
    },
  });

  // Define createStore mutation
  const [createStore, { loading: createStoreLoading }] = useMutation(
    CREATE_STORE,
    {
      onCompleted: (data) => {
        console.log("Create Store Response Data", data);
        setStoreData(data.createStore.data.attributes);
        if (data.createStore.data) {
          // redirect user to the shop setup page
          navigate("/profile/shop/setup");
        }
      },
      onError: (err: ApolloError) => {
        console.log(err);
        setLoadingStore(false);
      },
    }
  );

  // Define updateStore mutation
  const [updateStore, { loading: updateStoreLoading }] = useMutation(
    UPDATE_STORE,
    {
      onCompleted: (data) => {
        console.log("Update Store Response Data", data);
        setStoreData(data.updateStore.data.attributes);
      },
      onError: (err: ApolloError) => {
        console.log("Update Store Error: ", err);
        setLoadingStore(false);
      },
    }
  );

  // Define uploadFiles mutation
  const [uploadFiles, { loading: imageUploading, error: imageUploadError }] =
    useMutation(UPLOAD_MULTIPLE_FILES, {
      onCompleted: (data) => {},
      onError: (e) => {
        console.log("error", JSON.stringify(e));
      },
    });

  // Define checkDuplicateFiles mutation
  const [
    checkDuplicateFiles,
    { loading: checkingDuplicates, error: checkingDuplicatesError },
  ] = useMutation(CHECK_DUPLICATE_FILES, {
    onCompleted: (data) => {},
    onError: (e) => {
      console.log("error", JSON.stringify(e));
    },
  });

  // ------------------------------------------------------------------------
  // Define form state hanlders
  // ------------------------------------------------------------------------

  const methods = useForm<StoreData>({
    defaultValues: {
      Title: storeData?.Title ? storeData?.Title : "",
      Description: storeData?.Description ? storeData?.Description : "",
      Rating: storeData?.Rating ? storeData?.Rating : null,
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
      Featured_Image: storeData?.Featured_Image
        ? storeData?.Featured_Image
        : [],
      Gallery: storeData?.Gallery ? storeData?.Gallery : [],
    },
    resolver: yupResolver(schema),
  });

  const setupLoadedDataImages = async (storeData: any) => {
    const images: any[] = storeData?.Gallery?.data;
    const loadedImages: any[] = [];
    if (images?.length > 0) {
      for (let j = 0; j < images.length; j++) {
        if (images[j]) {
          // Create a file from the image to use it normally
          let response = await fetch(
            `${currentApi.url}${images[j]?.attributes?.url}`
          );
          let blobData = await response.blob();
          const fileName: string = images[j]?.attributes?.name;
          const file = new File([blobData], images[j]?.attributes?.name, {
            type: `image/${fileName.split(".")[1]}`,
          });

          loadedImages.push({ file: file });
        }
      }
    }

    let file: [{ file: File }] | null = null;
    if (storeData?.Featured_Image?.data) {
      let response = await fetch(
        `${currentApi.url}${storeData?.Featured_Image?.data?.attributes?.url}`
      );
      let blobData = await response.blob();
      const fileName: string =
        storeData?.Featured_Image?.data?.attributes?.name;
      file = [
        {
          file: new File(
            [blobData],
            storeData?.Featured_Image?.data?.attributes?.name,
            {
              type: `image/${fileName.split(".")[1]}`,
            }
          ),
        },
      ];
    }

    return {
      featuredImage: file,
      gallery: loadedImages as FileList[],
    };
  };

  useEffect(() => {
    if (storeData) {
      const setupImages = async () => {
        const images = await setupLoadedDataImages(storeData).then(
          (data) => data
        );

        methods.reset({
          ...storeData,
          Featured_Image: images.featuredImage ? images.featuredImage : [],
          Gallery: images.gallery ? images.gallery : [],
        });
        setLoadingStore(false);
      };
      setupImages();
    }

    if (mode === "create") {
      setLoadingStore(false);
    }
  }, [storeData, pathname]);

  // Define strapiUpload function
  const uploadFilesToStrapi = async (
    imagedata: any,
    field: "Featured_Image" | "Gallery"
  ) => {
    let files: any = null;
    const compressedImages = [];
    if (imagedata?.length > 0) {
      // Compress images
      for (const item of imagedata) {
        //@ts-ignore
        compressedImages.push(await compressImage(item.file as File));
      }

      files = await uploadFiles({
        variables: {
          files: compressedImages,
          field: field,
          forStore: true,
        },
      });
    }

    if (imagedata?.length === 0) {
      files = await uploadFiles({
        variables: {
          files: imagedata,
          field: field,
          forStore: true,
        },
      });
    }

    console.log("files: ", files);

    const uploadedImageIds =
      files !== null && files?.data?.multipleUpload !== null
        ? files?.data?.multipleUpload.map((img: any) => {
            console.log(img);
            return img.data.id;
          })
        : [];

    return uploadedImageIds;
  };

  // Define checkDuplicates function
  const checkDuplicates = async (
    imagedata: any,
    field: "Featured_Image" | "Gallery"
  ) => {
    let files: any = undefined;
    const compressedImages = [];
    if (imagedata?.length > 0) {
      // Compress images
      for (const item of imagedata) {
        //@ts-ignore
        compressedImages.push(await compressImage(item.file as File));
      }

      files = await checkDuplicateFiles({
        variables: {
          files: compressedImages,
          field: field,
          forStore: true,
        },
      });
    }

    if (imagedata?.length === 0) {
      files = await checkDuplicateFiles({
        variables: {
          files: imagedata,
          field: field,
          forStore: true,
        },
      });
    }

    return files;
  };

  const submit: SubmitHandler<StoreData> = async (data) => {
    if (storeData) {
      // Update store
      console.log("(Update) submit data: ", data);
      // Upload images to Strapi
      const Featured_Image = await uploadFilesToStrapi(
        data.Featured_Image,
        "Featured_Image"
      );
      const Gallery = await uploadFilesToStrapi(data.Gallery, "Gallery");

      if (Featured_Image === "error" || Gallery === "error") {
        return false;
      }

      const variables = {
        ...data.Contact_Details.Address,
        ...data.Gallery,
        Social: [...data.Contact_Details.Social],
        Email: data.Contact_Details.Email,
        Title: data.Title,
        Description: data.Description,
        Rating: data.Rating,
        userID: id,
        Featured_Image:
          Featured_Image && Featured_Image.length > 0
            ? Featured_Image[0]
            : undefined,
        Gallery: Gallery,
      };

      try {
        updateStore({
          variables: variables,
        });
      } catch (e) {
        console.log("OnSubmit Update Store Error: ", e);
      }
    } else {
      // Create store
      console.log("(Create) submit data: ", data);
      // Upload images to Strapi
      const Featured_Image = await uploadFilesToStrapi(
        data.Featured_Image,
        "Featured_Image"
      );
      const Gallery = await uploadFilesToStrapi(data.Gallery, "Gallery");

      // Return if there was an error with uploading the images
      if (imageUploadError) {
        return;
      }

      const variables = {
        ...data.Contact_Details.Address,
        Social: [...data.Contact_Details.Social],
        Email: data.Contact_Details.Email,
        Title: data.Title,
        Description: data.Description,
        Featured_Image: Featured_Image?.length > 0 ? Featured_Image[0] : null,
        Gallery: Gallery,
        seller: id,
      };
      console.log("Variables: ", variables);
      try {
        createStore({
          variables: variables,
        });
      } catch (e) {
        console.log("OnSubmit Create Store Error: ", e);
      }
    }
  };

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Trigger form validation
    await methods.trigger();
    // Check if there are any form errors
    if (Object.keys(methods.formState?.errors).length > 0) {
      // There are form errors, don't submit form and return
      return false;
    }

    setLoadingMessage("Checking images");
    setLoadingStore(true);

    console.log("Do your file uploads here");
    // Upload files to strapi
    const Featured_Image = await checkDuplicates(
      methods.getValues().Featured_Image,
      "Featured_Image"
    );
    const Gallery = await checkDuplicates(
      methods.getValues().Gallery,
      "Gallery"
    );

    console.log("Featured_Image duplicates: ", Featured_Image);
    console.log("Gallery duplicates: ", Gallery);

    if (Featured_Image?.errors || Gallery?.errors) {
      // If there was an error with uploading files set a form error
      console.log("Throw a form error");
      Featured_Image?.errors &&
        methods.setError("Featured_Image", {
          message: `Image name "${Featured_Image?.errors.message}" taken`,
        });
      Gallery?.errors &&
        methods.setError("Gallery", {
          message: `Image name "${Gallery?.errors.message}" taken`,
        });
      setLoadingStore(false);
      return false;
    }
    if (storeData) {
      // The user is updating a store
      setLoadingMessage("Updating shop data");
    } else {
      // The user is creating a store
      setLoadingMessage("Creating shop");
    }
    // Submit the form to the backend
    console.log("Submit form data to backend");
    methods.handleSubmit(submit)(e);
  };

  if (loadingStore) {
    return (
      <BoxMUI sx={{ minHeight: "15rem" }} className="text-4xl p-5">
        <Loader size="large" />
        <Typo t="p" className="text-sm">
          {loadingMessage}
        </Typo>
      </BoxMUI>
    );
  }

  console.log("errors: ", methods.formState?.errors);

  // ------------------------------------------------------------------------
  // Define the store setup tabHeader component actions
  // ------------------------------------------------------------------------

  const setupBaseRoute = "/profile/shop/setup";
  const setupActions: any = [];
  let tabHeader_title = "";
  if (setupBaseRoute.length < pathname.length) {
    // if the current path is a sub-route of setupBaseRoute, add an action
    // that will allow the user to navigate back up one level, i.e. back to
    // setupBaseRoute

    tabHeader_title = mode === "create" ? "Create shop" : "Edit shop";
    setupActions.push({
      title: `Back`,
      action: () => {
        navigate(setupBaseRoute);
      },
    });
  } else if (setupBaseRoute.length === pathname.length) {
    // If the active tab is the setupBaseRoute tab add an action that
    // will allow the user to create or edit their store

    tabHeader_title = "Shop data";
    setupActions.push({
      title: storeData ? "Edit shop" : "Create shop",
      action: () => {
        navigate(
          storeData ? `${setupBaseRoute}/edit` : `${setupBaseRoute}/create`
        );
      },
    });
  }

  if (!storeData && mode === undefined) {
    // If the user has no store
    return (
      <Box style={style} className={classNames(className ? className : "")}>
        <TabHeader header_title={tabHeader_title} actions={setupActions} />
        <NoStoreFound />
      </Box>
    );
  }

  return (
    <Box style={style} className={classNames(className ? className : "")}>
      <TabHeader header_title={tabHeader_title} actions={setupActions} />
      <FormProvider {...methods}>
        <form
          className={classNames(
            className ? className : "",
            "flex flex-col p-5"
          )}
          onSubmit={formSubmit}
        >
          <PJSTextInput
            name="Title"
            label="Title"
            error={methods.formState?.errors?.Title?.message}
            placeholder="Title"
            disabled={disabled}
          />

          <PJSTextInput
            name="Description"
            label="Description"
            multiline
            error={methods.formState?.errors?.Description?.message}
            placeholder="Description"
            disabled={disabled}
          />

          <Box className="md:grid md:grid-cols-3 gap-5">
            <PJSTextInput
              name="Contact_Details.Email"
              label="Contact Email"
              error={methods.formState?.errors?.Contact_Details?.Email?.message}
              placeholder="Email Address"
              disabled={disabled}
            />
          </Box>

          <StoreAddressBlock disabled={disabled} />
          <SocialBlock disabled={disabled} />

          <Box className="px-8 pt-5 pb-8 mb-10 border-grey border rounded-sm w-max">
            <Typo className="pb-5 text-left" t="h5">
              Store Logo
            </Typo>
            <ImagesWidget
              name={"Featured_Image"}
              limit={1}
              disabled={disabled}
            />
          </Box>

          <Box className="px-8 pt-5 pb-8 mb-10 border-grey border rounded-sm">
            <Typo className="pb-5 mt-5 text-left" t="h5">
              Store Banner Images
            </Typo>
            <ImagesWidget name={"Gallery"} disabled={disabled} />
          </Box>

          {disabled === false && (
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
          )}
        </form>
      </FormProvider>
    </Box>
  );
};

export default StoreForm;
