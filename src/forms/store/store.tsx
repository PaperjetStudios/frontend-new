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
import { StoreData as storeDataType } from "../../components/store/types";

import StoreAddressBlock from "./address";
import SocialBlock from "./social";
import ImagesWidget from "./imagesWidget";

import { compressImage } from "../../util/files";
import Typo from "../../components/typo";
import { currentApi } from "../../config/config";

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
    Featured_Image: yup.array(),
    Gallery: yup.array(),
    slug: yup.string(),
  })
  .required();

const StoreForm: React.FC<Props> = ({ children, className, style }) => {
  const {
    loadingStore,
    storeData,
    getStore,
    createStore,
    updateStore,
    uploadFiles,
  } = useStore();
  const { id } = useUser();

  const methods = useForm<storeDataType>({
    defaultValues: {
      Title: storeData?.Title ? storeData?.Title : "",
      Description: storeData?.Description ? storeData?.Description : "",
      slug: storeData?.slug ? storeData?.slug : "",
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

  console.log("Form Errors: ", methods.formState?.errors);
  console.log("Store Data: ", storeData);

  const setupLoadedDataImages = async (storeData: any) => {
    console.log("Store Data: ", storeData);
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

    if (storeData) {
      const setupImages = async () => {
        const images = await setupLoadedDataImages(storeData).then(
          (data) => data
        );

        console.log("New Store Data: ", {
          ...storeData,
          Featured_Image: images.featuredImage ? images.featuredImage : [],
          Gallery: images.gallery ? images.gallery : [],
        });

        methods.reset({
          ...storeData,
          Featured_Image: images.featuredImage ? images.featuredImage : [],
          Gallery: images.gallery ? images.gallery : [],
        });
      };
      setupImages();
    }
  }, [storeData]);

  if (loadingStore) {
    return <Loader />;
  }

  // Define strapiUpload function
  const uploadFilesToStrapi = async (imagedata: any, field: string) => {
    let files: any = null;
    const compressedImages = [];
    if (imagedata?.length > 0) {
      // Compress images
      for (const item of imagedata) {
        console.log("Item: ", item);
        console.log("Type of Item File: ", item.file instanceof File);
        //@ts-ignore
        compressedImages.push(await compressImage(item.file as File));
      }

      console.log("Compressed Images: ", compressedImages);

      files = await uploadFiles({
        variables: {
          files: compressedImages,
          field: [field],
        },
      });
    }

    if (imagedata?.length === 0) {
      files = await uploadFiles({
        variables: {
          files: imagedata,
          field: [field],
        },
      });
    }

    console.log("Files: ", files);

    const uploadedImageIds =
      files !== null && files?.data?.multipleUpload !== null
        ? files?.data?.multipleUpload.map((img: any) => {
            console.log(img);
            return img.data.id;
          })
        : [];

    return uploadedImageIds;
  };

  const submit: SubmitHandler<storeDataType> = async (data) => {
    if (storeData) {
      console.log("(Update) submit data: ", data);
      // Upload images to Strapi
      const Featured_Image = await uploadFilesToStrapi(
        data.Featured_Image,
        "Featured_Image"
      );
      const Gallery = await uploadFilesToStrapi(data.Gallery, "Gallery");

      const variables = {
        ...data.Contact_Details.Address,
        ...data.Gallery,
        Social: [...data.Contact_Details.Social],
        Email: data.Contact_Details.Email,
        Title: data.Title,
        Description: data.Description,
        Rating: data.Rating,
        slug: data.slug,
        userID: id,
        Featured_Image: Featured_Image.length > 0 ? Featured_Image[0] : null,
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
      console.log("(Create) submit data: ", data);
      // Upload images to Strapi
      const Featured_Image = await uploadFilesToStrapi(
        data.Featured_Image,
        "Featured_Image"
      );
      const Gallery = await uploadFilesToStrapi(data.Gallery, "Gallery");

      const variables = {
        ...data.Contact_Details.Address,
        ...data.Gallery,
        Social: [...data.Contact_Details.Social],
        Email: data.Contact_Details.Email,
        Title: data.Title,
        Description: data.Description,
        Rating: data.Rating,
        slug: data.slug,
        userID: id,
        Featured_Image: Featured_Image.length > 0 ? Featured_Image[0] : null,
        Gallery: Gallery,
      };
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

          <Box className="px-8 pt-5 pb-8 mb-10 border-grey border rounded-sm w-min">
            <Typo className="pb-5 text-left" t="h5">
              Store Logo
            </Typo>
            <ImagesWidget name={"Featured_Image"} limit={1} />
          </Box>

          <Box className="px-8 pt-5 pb-8 mb-10 border-grey border rounded-sm">
            <Typo className="pb-5 mt-5 text-left" t="h5">
              Store Banner Images
            </Typo>
            <ImagesWidget name={"Gallery"} />
          </Box>

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
