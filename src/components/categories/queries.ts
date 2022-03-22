import { gql } from "@apollo/client";

export const BASE_CATEGORY = gql`
  fragment BASE_CATEGORY on Category {
    Title
    Image {
      data {
        id
        attributes {
          url
        }
      }
    }
    slug
  }
`;

export const GET_CATEGORIES = gql`
  query {
    categories {
      data {
        id
        attributes {
          Title
        }
      }
    }
  }
`;
