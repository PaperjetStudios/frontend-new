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
              .get(`api/users/me`)
              .then(async (response) => {
                console.log("first", response.data.email);
                if (response.data.email !== value) {
                  return await axiosInstance()
                    .get(`/utils/validEmail?email=${value}`)
                    .then((validCheck: any) => {
                      resolve(!validCheck.data);
                    });
                } else {
                  resolve(true);
                }
              })
              .catch((error) => {
                // Handle error.
                console.log("An error occurred:", error.response);
              });
          });
        }
      ),
  })
  .required();
