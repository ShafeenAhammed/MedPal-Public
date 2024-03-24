import { Component, ViewChild } from '@angular/core';
import { RoutingService } from 'src/app/services/user-service/routing.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

export interface UserData {
  name: string;
  email: string;
  mobile: number;
  age: number;
  sex: string;
  isBlocked: boolean;
}

@Component({
  selector: 'app-admin-customer-table',
  templateUrl: './admin-customer-table.component.html',
  styleUrls: ['./admin-customer-table.component.css']
})
export class AdminCustomerTableComponent {

  displayedColumns: string[] = ['name', 'email', 'mobile', 'age', 'sex', 'actions'];
  dataSource = new MatTableDataSource<UserData>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private routeService: RoutingService, private router: Router) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit () {
    const token= localStorage.getItem('jwtToken');
    if(token){
      this.routeService.getCustomers().subscribe((data) => {
        console.log('User data:', data.customers);
        this.dataSource.data = data.customers;
      });
    }
  }

  blockCustomer(email: string) {
    const user = this.dataSource.data.find(user => user.email === email);

    if (user) {
      user.isBlocked = !user.isBlocked;      
      this.routeService.blockCustomer(email).subscribe((data) => {
        console.log(data.message);
      });
    }
  }

  showDetails(user: UserData) {
    console.log('More details:', user);
  }
}
