export interface CustomerData {
    _id: string;
    customerId:string;
    name: string;
    email: string;
    password: string;
    role: string;
    mobile: number;
    age: number;
    sex: string;
    mobileVerified: boolean;
    emailVerified: boolean;
    address?: any[];
    cart?: any[];
    isBlocked:boolean;
    __v: number;
  }

  export interface GetCustomersResponse {
    message:string;
    customers: CustomerData[];
  }
  
  export interface BlockCustomerResponse {
    status: string;
    message: string;
  }

  export interface GetCustomerResponse {
    message:string;
    customer: CustomerData;
  }