import { gql } from "@apollo/client";

export const options_query = gql`
  query {
    option {
      data {
        attributes {
          Site_Title
          Notice
          Copyright
          Address
          Logo {
            data {
              attributes {
                url
              }
            }
          }
          Credit_Cards {
            data {
              attributes {
                url
              }
            }
          }
          SocialLinks {
            Type
            Url
          }
        }
      }
    }
  }
`;
