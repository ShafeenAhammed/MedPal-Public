import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const URL= environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  getDoctorSlots(doctorId:string): Observable<any> {
    return this.http.get(`${URL}/api/doctor-service/doctor/get-slots?doctorId=${doctorId}`);
  }

  addDoctorSlot(doctorId:string,newSlot: any): Observable<any> {
    return this.http.post(`${URL}/api/doctor-service/doctor/add-slot`, {doctorId,newSlot});
  }

  updateDoctorSlot(slotId: string, updateData: any): Observable<any> {
    return this.http.put(`${URL}/api/doctor-service/doctor/update-slot`, {slotId,updateData});
  }

  deleteDoctorSlot(slotId: string): Observable<any> {
    return this.http.delete(`${URL}/api/doctorId/doctor/slots/${slotId}`);
  }

  getDoctors(): Observable<any> {
    return this.http.get(`${URL}/api/doctor-service/doctor/get-doctors`);
  }

  getDoctorsBySpecialization(specialization: string): Observable<any> {
    return this.http.get(`${URL}/api/doctor-service/doctor/doctors-specialities?specialization=${specialization}`);
  }

  getDoctorById(doctorId:string): Observable<any> {
    return this.http.get(`${URL}/api/doctor-service/doctor/get-doctorbyid?doctorId=${doctorId}`);
  }

  getDocImage(imageName: string): Observable<Blob> {
    const url = `${URL}/api/doctor-service/doctor/get-doctorimage?imageName=${imageName}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  makeAppoinment(slotId:string,customerId:string,customerName:string,doctorId:string,doctorName:string,fees:number,timeSlot:any): Observable<any> {
    return this.http.post(`${URL}/api/doctor-service/doctor/make-appoinment`,{slotId,customerId,customerName,doctorId,doctorName,fees,timeSlot});
  }

  updateAppoinment(slotId:string,customerId:string,doctorId:string,appoinmentId:string,paymentId:string,razorpayOrderId:string,paymentStatus:string,orderStatus:string): Observable<any> {
    return this.http.patch(`${URL}/api/doctor-service/doctor/update-appoinment`,{slotId,customerId,doctorId,appoinmentId,paymentId,razorpayOrderId,paymentStatus,orderStatus});
  }

  getCustomerAppoinments(customerId:string): Observable<any> {
    return this.http.get(`${URL}/api/doctor-service/doctor/get-customer-appoinments?customerId=${customerId}`);
  }

  getDocAppoinments(doctorId:string): Observable<any> {
    return this.http.get(`${URL}/api/doctor-service/doctor/get-doc-appoinments?doctorId=${doctorId}`);
  }

  getDocStats(): Observable<any> {
    return this.http.get(`${URL}/api/doctor-service/doctor/get-doc-stats`);
  }

  completeAppointment(appointmentId:string): Observable<any> {
    return this.http.patch(`${URL}/api/doctor-service/doctor/complete-appointment`,{appointmentId});
  }
}
