export interface MedicalStoreRegistrationState {
    page1FormData: Page1FormData | null;
  }
  
  export interface Page1FormData {
    storeName: string;
    ownerName: string;
    email: string;
    mobile: string;
    license: string;
  }
  