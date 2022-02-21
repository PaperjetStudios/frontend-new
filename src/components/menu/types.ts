export type MenuItems = {
  Title: string;
  Extra_Class: string;
  Page: {
    data?: {
      attributes?: {
        Title: string;
        slug: string;
      };
    };
  };
  Category: {
    data?: {
      attributes?: {
        Title: string;
        slug: string;
      };
    };
  };
  Url: string;
};
