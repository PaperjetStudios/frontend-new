export type Review = {
  User: {
    data: {
      id: string;
    };
  };
  Product: {
    data: {
      id: string;
    };
  };
  Store: {
    data: {
      id: string;
    };
  };
  Message: string;
  Rating: number | string;
  Title: string;
};
