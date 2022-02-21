import { gql } from "@apollo/client";

export const BASE_STORE = gql`
  fragment BASE_STORE on Store {
    Title
    Description
    slug
    Rating
    Contact_Details {
      Validated
      Email
      Address {
        Street_Address_1
        Street_Address_2
        Suburb
        City
        Zip_Code
        Country
      }
      Social {
        Url
        Type
      }
    }
    Gallery {
      data {
        attributes {
          url
        }
      }
    }
    Featured_Image {
      data {
        attributes {
          url
        }
      }
    }
  }
`;

export const GET_STORE_BY_ID = gql`
  ${BASE_STORE}
  query ($id: ID!) {
    store(id: $id) {
      data {
        id
        attributes {
          ...BASE_STORE
        }
      }
    }
  }
`;
