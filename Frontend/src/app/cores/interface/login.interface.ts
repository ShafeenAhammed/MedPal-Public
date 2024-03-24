export interface AdminLoginResponse {
    message: string;
    authentication: boolean;
    token?: string;
    role?: string;
  }

  export interface CustomerLoginResponse {
    message: string;
    authentication: boolean;
    token?: string;
    role?: string;
    user?: {
      _id: string;
      name: string;
      email: string;
      password: string;
      role: string;
      mobile: number;
      age: number;
      sex: string;
      mobileVerified: boolean;
      emailVerified: boolean;
      address: any[];
      cart: any[];
      __v: number;
    };
  }

  export interface OtpResponse {
    status: string;
    message: string;
  }