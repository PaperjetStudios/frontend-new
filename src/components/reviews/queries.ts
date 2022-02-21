import { gql } from "@apollo/client";

export const BASE_REVIEW = gql`
  fragment BASE_REVIEW on Review {
    Message
    Rating
    Title
  }
`;
