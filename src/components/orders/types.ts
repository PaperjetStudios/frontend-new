export type OrderProps = {
  id: string;
  Unique: string;
  Payment: any;
  Delivery_Address: any;
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
