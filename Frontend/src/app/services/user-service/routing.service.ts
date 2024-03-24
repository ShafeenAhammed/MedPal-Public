import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminLoginResponse, CustomerLoginResponse, OtpResponse } from 'src/app/cores/interface/login.interface';
import { BlockCustomerResponse, GetCustomerResponse, GetCustomersResponse } from 'src/app/cores/interface/admin-get.interface';
import { environment } from 'src/environments/environment';


const URL= environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private http: HttpClient) { }

  register(name:string, email:string, mobile:number ,age: number, sex: string ,password:string): Observable<any>{
    const data={ name,email,mobile,age,sex,password};
    return this.http.post(`${URL}/api/user-service/customer/register`,data)
  }

  sendOtp(email:string): Observable<OtpResponse>{
    const data = email;
    return this.http.get<OtpResponse>(`${URL}/api/user-service/customer/otp?email=${data}`)
  }

  otpVerification(otp:number,email:string): Observable<OtpResponse> {
    const data = { otp, email };
    return this.http.post<OtpResponse>(`${URL}/api/user-service/customer/otp-verification`,data);
  }

  customerLogin(email:string, password: string): Observable<CustomerLoginResponse>{
    const data= {email,password};
    return this.http.post<CustomerLoginResponse>(`${URL}/api/user-service/customer/login`,data)
  }

  addCustomerAddress(customerId:string,address:any): Observable<any>{
    return this.http.post(`${URL}/api/user-service/customer/add-address`,{customerId,address});
  }

  getCustomerAddress(customerId:string): Observable<any>{
    return this.http.get(`${URL}/api/user-service/customer/get-address?customerId=${customerId}`);
  }

  adminLogin(email:string, password: string): Observable<AdminLoginResponse>{
    const data= {email,password};
    return this.http.post<AdminLoginResponse>(`${URL}/api/user-service/admin/login`,data)
  }

  getCustomerDetails(customerId:string):Observable<GetCustomerResponse>{
    return this.http.get<GetCustomerResponse>(`${URL}/api/user-service/customer/get-customerdetails?customerId=${customerId}`)
  }

  getCustomers():Observable<GetCustomersResponse>{
    return this.http.get<GetCustomersResponse>(`${URL}/api/user-service/admin/get-customers`)
  }

  blockCustomer(email:string):Observable<BlockCustomerResponse>{
    const data = { email };
    return this.http.patch<BlockCustomerResponse>(`${URL}/api/user-service/admin/block-customers`,data)
  }

  medicalStoreRegister(formData:FormData) : Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${URL}/api/user-service/medicalstore/register`,formData,{headers})
  }

  medicalStoreLogin(email:string, password: string): Observable<CustomerLoginResponse>{
    const data= {email,password};
    return this.http.post<CustomerLoginResponse>(`${URL}/api/user-service/medicalstore/login`,data)
  }

  medicalStoreRequests() : Observable<any>{
    return this.http.get(`${URL}/api/user-service/admin/get-med-requests`)
  }

  getMedicalStoreLicense (fileName: string): Observable<Blob> {
    const url = `${URL}/api/user-service/admin/get-licensefile?fileName=${fileName}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  medicalStoreRequestDecision(email: string, applicationStatus: string) : Observable<any>{
    const data = { email, applicationStatus };
    return this.http.patch(`${URL}/api/user-service/admin/medrequest`, data)
  }

  getMedicalStores(): Observable<any>{
    return this.http.get(`${URL}/api/user-service/admin/get-medicalstores`)
  }

  blockMedicalStore(email:string):Observable<any>{
    const data = { email };
    return this.http.patch(`${URL}/api/user-service/admin/block-medicalstores`,data)
  }

  getCartProducts(customerId: string):Observable<any> {
    // const data = {customerId};
    return this.http.get(`${URL}/api/user-service/customer/getproductcount?customerId=${customerId}`);
  }
  
  addToCart(customerId: string,productId: string):Observable<any> {
    const data = {customerId, productId};
    return this.http.patch(`${URL}/api/user-service/customer/addtocart`,{data});
  }

  removeCart(customerId: string,productId: string):Observable<any> {
    const data = {customerId, productId};
    return this.http.patch(`${URL}/api/user-service/customer/removecart`,{data});
  }

  addFcmToken(customerId:string,fcmToken:string):Observable<any> {
    return this.http.patch(`${URL}/api/user-service/customer/add-fcmtoken`,{customerId,fcmToken});
  }

  sendNotification(customerId:string,title:string,body:string):Observable<any> {
    return this.http.post(`${URL}/api/user-service/customer/send-notification`,{customerId,title,body});
  }

  //doctor

  doctorRegister(formData:FormData) : Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${URL}/api/user-service/doctor/register`,formData,{headers})
  }

  doctorLogin(email:string, password: string): Observable<any>{
    const data= {email,password};
    return this.http.post<any>(`${URL}/api/user-service/doctor/login`,data)
  }

  doctorRequests() : Observable<any>{
    return this.http.get(`${URL}/api/user-service/admin/get-doc-requests`)
  }

  getDoctorLicense (fileName: string): Observable<Blob> {
    const url = `${URL}/api/user-service/admin/get-doc-licensefile?fileName=${fileName}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  doctorRequestDecision(email: string, applicationStatus: string) : Observable<any>{
    const data = { email, applicationStatus };
    return this.http.patch(`${URL}/api/user-service/admin/doctorrequest`, data)
  }

}
