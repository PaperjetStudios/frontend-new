import { ApolloError, gql, useQuery } from "@apollo/client";

import Box from "../components/box";
import Loader from "../components/loader";

import Modal from "@mui/material/Modal";
import Typo from "../components/typo";
import { currentApi } from "../config/config";

import { ModalProps } from "./types";
import RemoveTopButton from "../components/common/remove-top-button";

const BaseModal: React.FC<ModalProps> = ({
  trigger,
  showing,
  toggle,
  children,
}) => {
  const { loading, data } = useQuery(
    gql`
      query ($trigger: String) {
        notifications(filters: { Trigger: { eq: $trigger } }) {
          data {
            id
            attributes {
              Headline
              Subtitle
              Message
              Image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      skip: trigger === "",
      variables: {
        trigger: trigger,
      },
      onCompleted: (data) => {
        // console.log(data);
      },
      onError: (error: ApolloError) => {
        console.log(JSON.stringify(error));
      },
    }
  );

  if (loading) {
    return <Loader />;
  }

  const modal = data.notifications.data[0].attributes;

  return (
    <Modal
      open={showing}
      onClose={() => {
        toggle(false);
      }}
    >
      <Box className="flex flex-col bg-white rounded-md min-w-modalWidth relative max-h-4/5">
        <RemoveTopButton
          onClick={() => {
            toggle(false);
          }}
        />
        <Box
          className="p-5 rounded-t-md bg-cover"
          style={{
            backgroundImage: `url(${currentApi.url}${modal.Image.data.attributes.url})`,
          }}
        >
          <Typo className="text-white text-shadow-lg" bold t="h1">
            {modal.Headline}
          </Typo>
          {modal.Subtitle !== "" && (
            <Typo className="text-white text-shadow-lg" t="h4">
              {modal.Subtitle}
            </Typo>
          )}
        </Box>
        <Box className="bg-blue-200 bg-opacity-20 rounded-md max-h-4/5 overflow-x-hidden overflow-y-scroll">
          <Box className="px-5 py-4 rounded-b-md">
            {modal.Message !== "" && (
              <Typo className="my-2" t="p">
                {modal.Message}
              </Typo>
            )}
            {children}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default BaseModal;
