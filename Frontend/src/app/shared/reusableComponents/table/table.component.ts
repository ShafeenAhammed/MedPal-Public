import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RoutingService } from 'src/app/services/user-service/routing.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() dataSource: any[] = [];
  // @Input() dataSource = new MatTableDataSource<any>([]);
  @Input() displayedColumns: string[] = [];
  @Input() route!:string;

  @Output() decisionEvent = new EventEmitter<{email: string, applicationStatus:string}>();
  @Output() getLicenseFileEvent = new EventEmitter<{licenseFile: string}>();
  @Output() buttonClick2 = new EventEmitter<string>();
  @Output() blockUnblockEvent = new EventEmitter<string>();
  @Output() updateOrderEvent = new EventEmitter<{orderId:string}>()
  
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tableDataSource = new MatTableDataSource<any>([]);
  searchBox : string = '';
  filteredData: any[] = [];

  constructor (private routingService: RoutingService) {}

  ngOnChanges(changes: SimpleChanges) {

    this.tableDataSource.data  = this.dataSource;
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
  }

  onSearch(searchVal: string) {
    
    if (searchVal.trim() === '') {
      this.filteredData = [];
      this.tableDataSource.data = this.dataSource;
      return;
    }

    this.filteredData = this.dataSource.filter((searchData: any)=>{
      const values = Object.values(searchData);
      let flag = false;
      values.forEach((val : any)=>{
        if(val.toString().toLowerCase().indexOf(searchVal) >-1){
          flag = true;
          return;
        }
      })
      if(flag) {
        return searchData;
      }
    });
    this.tableDataSource.data = this.filteredData;
  }
 
  medStoreReqDecision(email: string, applicationStatus:string) {
    this.decisionEvent.emit({email,applicationStatus});
  }
  blockUnblock (email:string) {
    const user = this.dataSource.find(user => user.email === email);
    if (user) {
      user.isBlocked = !user.isBlocked;      
      this.blockUnblockEvent.emit(email);
    }

  }

  details (email:string) {
    this.buttonClick2.emit(email);
  }

  getLicenseFile(licenseFile:string) {
    this.getLicenseFileEvent.emit({licenseFile});    
  }

  updateOrder(orderId: string) {
    this.updateOrderEvent.emit({orderId});
  }
}
