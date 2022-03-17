import React, { useState, useEffect, useRef } from "react";
// Import Form Libraries
import { useFormContext, useFieldArray } from "react-hook-form";
// Import MUI Components
import { Box } from "@mui/system";
import { Button, Alert } from "@mui/material";
// Import Icons
import { Icons } from "../../components/icons";
// Import Utitlity Function
import { readImageFile } from "../../util/files";

// -----------------------------------------------------
// AddImage Component
// -----------------------------------------------------

type AddImagesProps = {
  imageInputElementRef: React.MutableRefObject<any>;
  onClick?: (data?: any) => void;
};

const AddImage: React.FC<AddImagesProps> = ({
  imageInputElementRef,
  onClick = () => {},
}) => {
  return (
    <>
      <Button
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          maxWidth: "100%",
          height: "114px",
          background: "#ccc",
          padding: "10px",
        }}
        onClick={() => {
          //@ts-ignore
          imageInputElementRef.current.click();
          onClick();
        }}
        variant="text"
        //   className="text-light w-full uppercase text-6xl "
        //   icon={Icons.camera}
        //   icon_pos="end"
        //   type="icon"
      >
        {Icons.plus}
      </Button>
    </>
  );
};

// -----------------------------------------------------
// ImageDisplay Component
// -----------------------------------------------------

type ImageDisplayProps = {
  src: any;
  alt?: string;
  onClick?: (data?: any) => void;
};

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  src,
  alt = "",
  onClick = () => {},
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        maxWidth: "100%",
        background: "#ccc",
        padding: "10px",
      }}
    >
      <Button
        //   center
        onClick={onClick}
        sx={{
          position: "absolute",
          top: "0",
          right: "0",
          transform: "translate(30%, -50%)",
          background: "#000",
          color: "#fff",
          borderRadius: "100%",
          width: "40px !important",
          height: "40px !important",
          minWidth: "0",
          // fontSize: 20,
          "&:hover": {
            background: "#ccc",
          },
        }}
        variant="contained"
        //   className="absolute rounded-full bg-primary block text-light right-0 top-0 w-6 h-6 transform translate-x-1/3 -translate-y-1/3"
      >
        {Icons.trashSolid}
      </Button>
      <img
        style={{
          maxHeight: "94px",
          objectFit: "contain",
          width: "auto",
          maxWidth: "150px",
        }}
        src={src}
        alt={alt}
      />
    </Box>
  );
};

// -----------------------------------------------------
// ImagesWidget Component
// -----------------------------------------------------

type ImagesWidgetProps = {
  name: string;
  limit?: number;
  multiple?: boolean;
};

const ImagesWidget: React.FC<ImagesWidgetProps> = ({
  name,
  limit = 3,
  multiple = false,
}) => {
  const imageInputElementRef = useRef(null);
  const [previewImages, setPreviewImages] = useState<any[]>([]);
  const { control, formState, watch, setError, clearErrors } = useFormContext();

  const { fields, append, remove } = useFieldArray(
    //   <
    //     StoreData,
    //     "Contact_Details.Social"
    //   >
    {
      control,
      name: name,
    }
  );

  const watchedImages = watch(name);

  // Define addImages function
  const addImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: any = e.target.files;
    let count = fields.length;

    const duplicate: any = fields?.find((field: any) => {
      if (field.file.name === files[0].name) {
        return true;
      }
    });
    // If file is a duplicate set a Validation error
    // NOTE: I handle the validation for images here because
    // the test() method in the validation schema does not
    // work as expected
    if (duplicate) {
      setError(
        name,
        { message: "Cannot upload same image twice" },
        { shouldFocus: true }
      );
      return;
    } else {
      // There is no duplicate clear any validation error for this field
      clearErrors(name);
    }
    // only allow limit number of images
    if (files !== null) {
      for (let j = 0; j < files.length; j++) {
        if (count < limit) {
          append({ file: files[j] });
        }
        count++;
      }
    }
  };

  // Read the image files
  useEffect(() => {
    const setPreviews = async () => {
      const visibleImages: any[] = [];
      for (let j = 0; j < watchedImages?.length; j++) {
        if (watchedImages[j] !== null && j < limit) {
          visibleImages.push(await readImageFile(watchedImages[j].file));
        }
      }
      setPreviewImages(visibleImages);
    };
    setPreviews();
  }, [watchedImages]);

  const previews = previewImages?.map((image, j) => {
    if (j < limit) {
      if (image !== null) {
        // Display image, i.e. render DisplayImage component
        return (
          <ImageDisplay
            key={`image-widget-${name}-image-display-${j}`}
            src={image}
            onClick={() => {
              console.log("Fields: ", fields);
              console.log("Image removed: ", j);
              remove(j);
            }}
          />
        );
      }
    }
  });

  // Display AddImage component
  if (previews.length < limit) {
    previews.push(
      <AddImage
        key={`image-widget-${name}-add-image`}
        imageInputElementRef={imageInputElementRef}
      />
    );
  }

  return (
    <>
      {formState?.errors[name] && (
        <Alert className="mb-8" severity="warning">
          {formState?.errors[name]?.message}
        </Alert>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gridGap: "40px",
        }}
      >
        {previews}
      </Box>
      <input
        ref={imageInputElementRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (fields.length < limit) {
            addImages(e);
          }
        }}
        id={name}
        name={name}
        multiple={multiple}
        type="file"
        hidden
      />
    </>
  );
};

export default ImagesWidget;
