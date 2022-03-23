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
    DeliveryMethods {
      data {
        id
        attributes {
          Title
          Description
          Cost
          Logo {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
    Gallery {
      data {
        attributes {
          url
          name
        }
      }
    }
    Featured_Image {
      data {
        attributes {
          url
          name
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

export const GET_STORE_BY_USER_ID = gql`
  ${BASE_STORE}
  query ($id: ID!) {
    findMyStore(id: $id) {
      data {
        id
        attributes {
          ...BASE_STORE
        }
      }
    }
  }
`;

export const CREATE_STORE = gql`
  ${BASE_STORE}
  mutation (
    $Title: String
    $Description: String
    $seller: ID!
    $Rating: Float
    $Email: String
    $Street_Address_1: String
    $Street_Address_2: String
    $Suburb: String
    $City: String
    $Zip_Code: String
    $Country: String
    $Social: [ComponentMenuSocialInput]
    $Featured_Image: ID
    $Gallery: [ID]
  ) {
    createStore(
      id: $seller
      data: {
        Title: $Title
        Description: $Description
        Seller: $seller
        Rating: $Rating
        Contact_Details: {
          Email: $Email
          Address: {
            Street_Address_1: $Street_Address_1
            Street_Address_2: $Street_Address_2
            Suburb: $Suburb
            City: $City
            Zip_Code: $Zip_Code
            Country: $Country
          }
          Social: $Social
        }
        Featured_Image: $Featured_Image
        Gallery: $Gallery
      }
    ) {
      data {
        id
        attributes {
          ...BASE_STORE
        }
      }
    }
  }
`;

export const UPDATE_STORE = gql`
  ${BASE_STORE}
  mutation UpdateStore(
    $Title: String
    $Description: String
    $userID: ID!
    $Rating: Float
    $Email: String
    $Street_Address_1: String
    $Street_Address_2: String
    $Suburb: String
    $City: String
    $Zip_Code: String
    $Country: String
    $Social: [ComponentMenuSocialInput]
    $Featured_Image: ID
    $Gallery: [ID]
  ) {
    updateStore(
      id: $userID
      data: {
        Title: $Title
        Description: $Description
        Seller: $userID
        Rating: $Rating
        Contact_Details: {
          Email: $Email
          Address: {
            Street_Address_1: $Street_Address_1
            Street_Address_2: $Street_Address_2
            Suburb: $Suburb
            City: $City
            Zip_Code: $Zip_Code
            Country: $Country
          }
          Social: $Social
        }
        Featured_Image: $Featured_Image
        Gallery: $Gallery
      }
    ) {
      data {
        id
        attributes {
          ...BASE_STORE
        }
      }
    }
  }
`;

export const UPLOAD_MULTIPLE_FILES = gql`
  mutation ($files: [Upload]!, $field: String!, $forStore: Boolean) {
    multipleUpload(files: $files, field: $field, forStore: $forStore) {
      data {
        id
      }
    }
  }
`;

export const CHECK_DUPLICATE_FILES = gql`
  mutation (
    $files: [Upload]!
    $field: String!
    $forStore: Boolean
    $forProduct: Boolean
  ) {
    checkDuplicateFiles(
      files: $files
      field: $field
      forStore: $forStore
      forProduct: $forProduct
    ) {
      data {
        id
      }
    }
  }
`;
