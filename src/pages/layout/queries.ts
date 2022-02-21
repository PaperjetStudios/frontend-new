import { gql } from "@apollo/client";

export const footer_menu_query = gql`
  query {
    footerMenu {
      data {
        attributes {
          Footer_Columns {
            ... on ComponentMenuFooterColumns {
              Title
              Items {
                ... on ComponentMenuMenuItem {
                  Title
                  Extra_Class
                  Category {
                    data {
                      attributes {
                        Title
                        slug
                      }
                    }
                  }
                  Page {
                    data {
                      attributes {
                        Title
                        slug
                      }
                    }
                  }
                  Url
                }
              }
              Widgets {
                ... on ComponentMenuWidgets {
                  Type
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;
