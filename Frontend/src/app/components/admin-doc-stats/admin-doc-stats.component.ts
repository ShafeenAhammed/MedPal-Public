import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DoctorService } from 'src/app/services/doctorService/doctor.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-admin-doc-stats',
  templateUrl: './admin-doc-stats.component.html',
  styleUrls: ['./admin-doc-stats.component.css']
})
export class AdminDocStatsComponent {
  topDoctorsData!: any;
  specializationData!:any;
  barChart!:any;
  pieChart!:any;

  constructor (private doctorService: DoctorService){}

  ngOnInit (){
    this.doctorService.getDocStats().subscribe((data)=>{
      this.topDoctorsData = data.topDoctors;
      this.specializationData = data.totalSpecBookings;
      console.log("docstats",this.topDoctorsData);
      console.log("spec stats", this.specializationData);
      this.createHorizontalBarChart();
      this.createDonutChart();
    })
  }

  createHorizontalBarChart() {
    const categories = this.topDoctorsData.map((item: any) => item.doctorName);
    const seriesData = this.topDoctorsData.map((item: any) => item.totalAppointments);

    const horizontalBarChartOptions: Highcharts.Options = {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Top Doctors with Most Appointments'
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Doctor Name'
        }
      },
      yAxis: {
        title: {
          text: 'Total Appointments'
        }
      },
      series: [{
        type:'bar',
        name: 'Appointments',
        data: seriesData
      }]
    };

    this.barChart = new Chart(horizontalBarChartOptions);
  }

  createDonutChart() {
    const categories = this.specializationData.map((item: any) => item._id);
    const seriesData = this.specializationData.map((item: any) => ({ name: item._id, y: item.totalBookings }));

    const donutChartOptions: Highcharts.Options = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Total Bookings by Specialization'
      },
      series: [{
        type: 'pie',
        name: 'Specialization',
        data: seriesData
      }]
    };

    this.pieChart = new Chart(donutChartOptions);
  }
}
