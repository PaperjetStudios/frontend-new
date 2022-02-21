import { axiosInstance } from "../../config/api";

export const updateOrderStatus = (id: string, status: string) => {
  const data = {
    Status: status,
  };

  return axiosInstance()(`/api/orders/${id}`, {
    method: "put",
    data: { data: data },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log("An error occurred:", error.response);
    });
};
