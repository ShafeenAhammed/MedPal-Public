import { Component } from '@angular/core';
import { DoctorService } from 'src/app/services/doctorService/doctor.service';

@Component({
  selector: 'app-user-doctor-view',
  templateUrl: './user-doctor-view.component.html',
  styleUrls: ['./user-doctor-view.component.css']
})
export class UserDoctorViewComponent {
  doctors: any[] = [];
  selectedSpecialization: string = '';
  specialities: any[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe((data) => {
      this.doctors = data.doctors;
      this.specialities = Array.from(new Set(this.doctors.map(doctor => doctor.specialization)));
      this.fetchImages(this.doctors);
    });
  }

  filterDoctorsBySpecialization() {
    if (this.selectedSpecialization) {
      this.doctorService
        .getDoctorsBySpecialization(this.selectedSpecialization)
        .subscribe((data) => {
          this.doctors = data;
          this.fetchImages(this.doctors);
        });
    } else {
      this.loadDoctors();
    }
  }

  fetchImages(docs: any[]): void {
    docs.forEach((doc:any) => {
      this.doctorService.getDocImage(doc.doctorImage).subscribe(imageData => {
        const reader = new FileReader();
        reader.onloadend = () => {
          doc.doctorImage = reader.result as string;
        };
        reader.readAsDataURL(imageData);
      });
    });
  }

}
