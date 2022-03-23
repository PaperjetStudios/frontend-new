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
          name
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
  userID: string | number
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

  if (userID !== "") {
    filters += ` Store: { Seller: { id: { eq: ${userID} } } } `;
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
  mutation (
    $files: [Upload]!
    $field: String!
    $forProduct: Boolean
    $productID: ID
  ) {
    multipleUpload(
      files: $files
      field: $field
      forProduct: $forProduct
      productID: $productID
    ) {
      data {
        id
      }
    }
  }
`;

export const CHECK_DUPLICATE_PRODUCT_FILES = gql`
  mutation (
    $files: [Upload]!
    $field: String!
    $forProduct: Boolean
    $productID: ID
  ) {
    checkDuplicateFiles(
      files: $files
      field: $field
      forProduct: $forProduct
      productID: $productID
    ) {
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

export const UPDATE_PRODUCT = gql`
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
    $id: ID!
  ) {
    updateProduct(
      id: $id
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

export const CHECK_PRODUCT_TITLE = gql`
  ${BASE_PRODUCT}
  mutation ($Title: String, $productID: ID) {
    checkProductTitle(Title: $Title, productID: $productID) {
      data {
        id
        attributes {
          ...BASE_PRODUCT
        }
      }
    }
  }
`;

export const GET_STORE_PRODUCTS_BY_USER_ID = gql`
  ${BASE_PRODUCT}
  query ($userID: ID!) {
    products(filters: { Store: { Seller: { id: { eq: $userID } } } }) {
      data {
        id
        attributes {
          ...BASE_PRODUCT
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  ${BASE_PRODUCT}
  query ($slug: String) {
    products(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          ...BASE_PRODUCT
        }
      }
    }
  }
`;
