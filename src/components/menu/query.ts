import { gql } from "@apollo/client";

export const main_menu_query = gql`
  query {
    menu {
      data {
        id
        attributes {
          Item {
            ... on ComponentMenuMenuItem {
              Title
              Extra_Class
              Page {
                data {
                  attributes {
                    slug
                  }
                }
              }
              Category {
                data {
                  attributes {
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
