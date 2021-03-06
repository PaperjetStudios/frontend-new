import { gql } from "@apollo/client";
import { BASE_CATEGORY } from "../categories/queries";
import { BASE_REVIEW } from "../reviews/queries";

export const BASE_PRODUCT = gql`
  ${BASE_REVIEW}
  ${BASE_CATEGORY}
  fragment BASE_PRODUCT on Product {
    Title
    Description
    slug
    Rating
    Variation {
      Quantity
      SKU
      Price
    }
    Store {
      data {
        id
        attributes {
          Title
          slug
          DeliveryMethods {
            data {
              id
              attributes {
                Title
                Description
                Cost
                delivery_options {
                  id
                  Description
                  Cost
                }
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
        }
      }
    }
    Condition
    Featured_Image {
      data {
        attributes {
          url
        }
      }
    }
    Gallery {
      data {
        attributes {
          url
        }
      }
    }
    Tags {
      data {
        id
        attributes {
          Title
          slug
        }
      }
    }
    Reviews {
      data {
        id
        attributes {
          ...BASE_REVIEW
        }
      }
    }
    Categories {
      data {
        id
        attributes {
          ...BASE_CATEGORY
        }
      }
    }
  }
`;

export const single_product_by_id = gql`
  ${BASE_PRODUCT}
  query ($id: ID!) {
    product(id: $id) {
      data {
        attributes {
          ...BASE_PRODUCT
        }
      }
    }
  }
`;
export const paginated_products = (
  categorySlug: string,
  storeSlug: string,
  tagSlug: string,
  condition: string
) => {
  //BUILD FILTERS
  let filters = "";

  if (categorySlug !== "") {
    filters += `Categories:{slug: {contains:"${categorySlug}"}}`;
  }

  if (storeSlug !== "") {
    filters += `Store:{slug: {contains:${storeSlug}}}`;
  }

  if (tagSlug !== "") {
    filters += `Tags:{slug: {contains:${tagSlug}}}`;
  }

  if (condition !== "" && condition !== "Any") {
    filters += `Condition:{contains:"${condition}"}`;
  }

  return gql`
  query (
    $page: Int
    $pageSize: Int
  ) {
    products(
      pagination: { page: $page, pageSize: $pageSize }
      filters: {
       ${filters}
      }
    ) {
      meta {
        pagination {
          total
          pageCount
          pageSize
          page
        }
      }
      data {
        id
      }
    }
  }
`;
};

export const GET_TAGS = gql`
  query {
    tags {
      data {
        id
        attributes {
          Title
        }
      }
    }
  }
`;
