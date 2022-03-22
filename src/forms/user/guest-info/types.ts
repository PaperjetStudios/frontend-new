export type FormType = {
  email: string;
  Phone: string;
  LastName: string;
  FirstName: string;
  Street_Address_1: string;
  Street_Address_2: string;
  Suburb: string;
  City: string;
  Country: string;
  Zip_Code: string;
  create_profile_check: boolean;
  guestProfile: boolean;
  password?: string;
};

export const empty = {
  email: "",
  Phone: "",
  LastName: "",
  FirstName: "",
  Street_Address_1: "",
  Street_Address_2: "",
  Suburb: "",
  City: "",
  Country: "",
  Zip_Code: "",
  create_profile_check: true,
  password: "",
  guestProfile: false,
};
