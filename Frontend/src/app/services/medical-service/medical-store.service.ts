import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL= environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class MedicalStoreService {

  constructor(private http: HttpClient) { }

  medicalStoreAddProduct(formData: FormData) : Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${URL}/api/medicalstore-service/medicalstore/addproduct`,formData,{headers})
  }

  medicalStoreAddCategory(categoryName:string) : Observable<any>{
    const data = categoryName;
    return this.http.post(`${URL}/api/medicalstore-service/medicalstore/addcategory`,data)
  }

  medicalStoreGetCategory() : Observable<any>{
    return this.http.get(`${URL}/api/medicalstore-service/medicalstore/getcategory`)
  }

  listMedicalStores() : Observable<any>{
    return this.http.get(`${URL}/api/medicalstore-service/medicalstore/liststores`)
  }

  getProductImages(imageName: string): Observable<Blob> {
    const url = `${URL}/api/medicalstore-service/medicalstore/getproductimages?imageName=${imageName}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  getProducts(medId:string):Observable<any> {
    return this.http.get(`${URL}/api/medicalstore-service/medicalstore/listproducts?medId=${medId}`);
  }

  productList():Observable<any> {
    return this.http.get(`${URL}/api/medicalstore-service/medicalstore/liststores`)
  }

  createOrder(customerId:string,customerName:string,medId:string,medName:string,products:any,deliveryAddress:any,orderTotal:number):Observable<any> {
    return this.http.post(`${URL}/api/medicalstore-service/medicalstore/place-order`,{customerId,customerName,medId,medName,products,deliveryAddress,orderTotal})
  }

  updateOrder(customerId:string,medId:string,orderId:string,paymentId:string,razorpayOrderId:string,paymentStatus:string,orderStatus:string):Observable<any> {
    return this.http.patch(`${URL}/api/medicalstore-service/medicalstore/update-order`,{customerId,medId,orderId,paymentId,razorpayOrderId,paymentStatus,orderStatus})
  }

  updateOrderStatus(orderId:string,orderStatus:string):Observable<any> {
    return this.http.patch(`${URL}/api/medicalstore-service/medicalstore/update-orderstatus`,{orderId,orderStatus})
  }

  getMedStoreDetails(medId:string):Observable<any> {
    return this.http.get(`${URL}/api/medicalstore-service/medicalstore/get-medstore?medId=${medId}`);
  }

  getCustomerOrders(customerId:string):Observable<any> {
    return this.http.get(`${URL}/api/medicalstore-service/medicalstore/get-customerorders?customerId=${customerId}`);
  }

  getOrders(medId:string):Observable<any> {
    return this.http.get(`${URL}/api/medicalstore-service/medicalstore/list-orders?medId=${medId}`);
  }

  // getOrderById(orderId:string):Observable<any> {
  //   return this.http.get(`${URL}/api/medicalstore-service/medicalstore/get-orderbyid?orderId=${orderId}`);
  // }

  getOrderDetails(orderId:string):Observable<any> {
    return this.http.get(`${URL}/api/medicalstore-service/medicalstore/get-order?orderId=${orderId}`);
  }

  search(query:string):Observable<any> {
    return this.http.get(`${URL}/api/medicalstore-service/medicalstore/search?data=${query}`);
  }

  getAdminMedStats():Observable<any> {
    return this.http.get(`${URL}/api/medicalstore-service/medicalstore/get-admin-med-stats`);
  }

  getMedStatsById(medId:string):Observable<any> {
    return this.http.get(`${URL}/api/medicalstore-service/medicalstore/get-med-stats?medId=${medId}`);
  }

}
