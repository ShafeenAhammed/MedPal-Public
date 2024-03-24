import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';
import { MedicalStoreService } from 'src/app/services/medical-service/medical-store.service';


@Component({
  selector: 'app-admin-med-store-stats',
  templateUrl: './admin-med-store-stats.component.html',
  styleUrls: ['./admin-med-store-stats.component.css']
})
export class AdminMedStoreStatsComponent {

  orderDistribution!:any;
  orderTimeData!:any;
  colChart!: any;
  colChartOptions!: Highcharts.Options
  donutChart!:any;

  constructor (private medicalService: MedicalStoreService){}

  ngOnInit (){
    this.medicalService.getAdminMedStats().subscribe((data)=>{
      this.orderDistribution = data.orderDistribution;
      console.log("orderDistribution", this.orderDistribution);
      this.orderTimeData = data.orderTimeData;
      console.log("order times",this.orderTimeData);
      
      this.setBarChart();
      this.createDonutChart();
    })
  }

  setBarChart () {
    const categories = this.orderDistribution.map((item: any) => item.medName);
    const seriesData = this.orderDistribution.map((item: any) => item.totalOrders);
    
    this.colChartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Order Distribution by Medical Store'
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Medical Store'
        }
      },
      yAxis: {
        title: {
          text: 'Total Orders'
        }
      },
      series: [{
        type:'column',
        name: 'Orders',
        data: seriesData
      }]
    }
    this.colChart = new Chart(this.colChartOptions);
  }

  createDonutChart() {
    const donutData = Object.entries(this.orderTimeData).map(([period, count]) => ({
      name: period,
      y: count as number
    }));
  
    const chartOptions: Highcharts.Options = {   
      chart : {
         plotBorderWidth: undefined,
         plotShadow: false
      },
      title : {
         text: 'Order Time Distribution'   
      },
      tooltip : {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions : {
         pie: {
            shadow: true,
            center: ['50%', '50%'],
            size:'45%',
            innerSize: '40%'            
         }
      },
      series : [{
         type: 'pie',
         name: 'Order Time',
         data: donutData
      }]
    };
  
    this.donutChart = new Chart(chartOptions);
  }
  

}
