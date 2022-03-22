export type OrderProps = {
  id: string;
  Unique: string;
  Payment: any;
  Delivery_Address: {
    method?: any;
    option?: any;
    extra?: any;
    address?: {
      street_1?: string;
      street_2?: string;
      suburb?: string;
      city?: string;
      province?: string;
      country?: string;
    };
  };
  Items: any;
  Total_Items: number;
  Total_Delivery: number;
  Total: number;
  Total_After_Commission: number;
  Commission: number;
  createdAt: string;
  Status: "Open" | "Shipped" | "Received" | "Closed";
  Store: {
    data: {
      id: string;
      attributes: {
        Title: string;
        slug: string;
      };
    };
  };
};
