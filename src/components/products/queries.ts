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
  tagSlug: string
) => {
  //BUILD FILTERS
  let filters = "";

  if (categorySlug !== "") {
    filters += `Categories:{slug: {contains:${categorySlug}}}`;
  }

  if (storeSlug !== "") {
    filters += `Store:{slug: {contains:${storeSlug}}}`;
  }

  if (tagSlug !== "") {
    filters += `Tags:{slug: {contains:${tagSlug}}}`;
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

export const UPLOAD_MULTIPLE_PRODUCT_FILES = gql`
  mutation ($files: [Upload]!, $field: String!, $forProduct: Boolean) {
    multipleUpload(files: $files, field: $field, forProduct: $forProduct) {
      data {
        id
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  ${BASE_PRODUCT}
  mutation (
    $Title: String
    $Description: String
    $Condition: ENUM_PRODUCT_CONDITION
    $Variation: [ComponentProductVariationInput]
    $Store: ID
    $Featured_Image: ID
    $Gallery: [ID]
    $Categories: [ID]
    $Tags: [ID]
  ) {
    createProduct(
      data: {
        Title: $Title
        Description: $Description
        Condition: $Condition
        Variation: $Variation
        Store: $Store
        Featured_Image: $Featured_Image
        Gallery: $Gallery
        Categories: $Categories
        Tags: $Tags
      }
    ) {
      data {
        id
        attributes {
          ...BASE_PRODUCT
        }
      }
    }
  }
`;
