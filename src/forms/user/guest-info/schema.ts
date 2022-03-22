import * as yup from "yup";
import { axiosInstance } from "../../../config/api";

export const schema = yup
  .object()
  .shape({
    FirstName: yup.string().required(),
    LastName: yup.string().required(),
    email: yup
      .string()
      .email("Please insert a valid email address")
      .test(
        "Unique Email",
        "That email already exists, have you signed up before?",
        function (value) {
          return new Promise((resolve, reject) => {
            axiosInstance()
              .get(`/utils/validEmail?email=${value}`)
              .then((validCheck: any) => {
                console.log("valid", value, validCheck);
                resolve(!validCheck.data);
              });
          });
        }
      )
      .required(),
    Street_Address_1: yup.string().required(),
    Suburb: yup.string().required(),
    City: yup.string().required(),
    Country: yup.string().required(),
    Zip_Code: yup.string().required(),
    password: yup.string().when("create_profile_check", {
      is: (create_profile_check) => create_profile_check === true,
      then: yup
        .string()
        .required("Please enter your password.")
        .min(8, "Your password is too short."),
    }),
    confirm_password: yup.string().when("create_profile_check", {
      is: (create_profile_check) => create_profile_check === true,
      then: yup
        .string()
        .required("Please retype your password.")
        .min(8, "Your password is too short.")
        .oneOf([yup.ref("password")], "Your passwords do not match."),
    }),
  })
  .required();
