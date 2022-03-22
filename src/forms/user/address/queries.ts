import { gql } from "@apollo/client";

export const EDIT_USER_ADDRESS = gql`
  mutation ($addresses: [ComponentUserAddressInput]) {
    updateMyInfo(data: { Address: $addresses }) {
      data {
        attributes {
          Address {
            Street_Address_1
            Street_Address_2
            Suburb
            City
            Country
            Zip_Code
          }
        }
      }
    }
  }
`;

export const GET_USER_ADDRESSES = gql`
  query {
    findMyInfo {
      data {
        attributes {
          Address {
            Street_Address_1
            Street_Address_2
            Suburb
            City
            Country
            Zip_Code
          }
        }
      }
    }
  }
`;
