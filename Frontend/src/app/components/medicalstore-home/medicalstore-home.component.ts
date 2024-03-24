import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { jwtDecode } from 'jwt-decode';
import { MedicalStoreService } from 'src/app/services/medical-service/medical-store.service';

@Component({
  selector: 'app-medicalstore-home',
  templateUrl: './medicalstore-home.component.html',
  styleUrls: ['./medicalstore-home.component.css']
})
export class MedicalstoreHomeComponent {

  decodedtoken!:any;
  medId!:any;
  orderedProducts!:any;
  orderedCategory!:any;

  barChart!: any;
  donutChart!:any;

  constructor (private medicalService: MedicalStoreService){}

  ngOnInit (){

    const token= localStorage.getItem('jwtToken');
    if(token){
      this.decodedtoken= jwtDecode(token);
      this.medId=this.decodedtoken.id;
    }

    this.medicalService.getMedStatsById(this.medId).subscribe((data)=>{
      this.orderedProducts = data.productCounts;
      console.log("orderedProducts", this.orderedProducts);
      this.orderedCategory = data.categoryCounts;
      console.log("order times",this.orderedCategory);
      
      this.setBarChart();
      this.createDonutChart();
    })
  }


  setBarChart(){
    const categories = Object.keys(this.orderedProducts);
    const seriesData: number[] = Object.values(this.orderedProducts);

    this.barChart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Ordered Products'
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Product'
        }
      },
      yAxis: {
        title: {
          text: 'Quantity'
        }
      },
      series: [{
        type:'bar',
        name: 'Quantity',
        data: seriesData
      }]
    });
  }
  
  createDonutChart() {
    const categories = Object.keys(this.orderedCategory);
    const seriesData = Object.entries(this.orderedCategory).map(([category, count]) => ({
      name: category,
      y: count as number
    }));

    this.donutChart = new Chart({
      chart: {
        plotBorderWidth: undefined,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Ordered Categories'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          shadow: false,
          center: ['50%', '50%'],
          size: '45%',
          innerSize: '20%'
        }
      },
      series: [{
        type: 'pie',
        name: 'Category Share',
        data: seriesData
      }]
    });
  }
}
