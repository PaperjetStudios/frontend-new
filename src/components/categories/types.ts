export type Category = {
  id: string | number;
  attributes: {
    Title: string;
    Image: {
      data: {
        id: string;
        attributes: {
          url: string;
        };
      };
    };
    slug: string;
  };
};
