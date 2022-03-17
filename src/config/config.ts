export const setup = {
  title: "SSS",
  description: "Ecommerce Store",
};

export const dev_api = {
  userStateName: "sss_dev_user",
  cartStateName: "sss_dev_cart",
  graphqlApi: "http://localhost:1337",
  url: "http://localhost:1337",
};

export const api = {
  userStateName: "sss_user",
  cartStateName: "sss_cart",
  graphqlApi: "https://sssuat.co.za",
  url: "https://sssuat.co.za",
};

export const createProductLink = (slug: string) => {
  return `/products/${slug}`;
};

export const createProductSellerLink = (slug: string) => {
  return `/profile/shop/products/${slug}`;
};

export const createCategoryLink = (id: string | number) => {
  return `/category/${id}`;
};

export const createStoreLink = (slug: string) => {
  return `/stores/${slug}`;
};

export const DefaultPageSize = 2;

export const currentApi = api;
