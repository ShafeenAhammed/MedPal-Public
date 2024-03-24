import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicalStoreService } from 'src/app/services/medical-service/medical-store.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.css']
})
export class OrderInvoiceComponent {
  order!: any;
  orderId!:string;
  orderDate!: string;

  constructor(private route: ActivatedRoute, private medicalService: MedicalStoreService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.orderId = params['orderId'];
    })
    this.medicalService.getOrderDetails(this.orderId).subscribe((data: any) => {
      this.order = data.order;
      this.orderDate = this.datePipe.transform(this.order.orderDate, 'dd/MM/yyyy') || '';
    });
  }

  generatePDF() {
  
    const documentDefinition = {
      content: [
        { text: 'Invoice', style: 'header' },
        { text: `Order ID: ${this.order.orderId}`, style: 'subheader' },
        { text: `Customer Name: ${this.order.customerName}`, style: 'subheader' },
        { text: `Order Date: ${this.orderDate}`, style: 'subheader' },
        { text: `Order Time: ${this.order.orderTime}`, style: 'subheader' },
        { text: `Delivery Address: ${this.order.deliveryAddress.address}`, style: 'subheader' },
        { text: 'Product Details', style: 'subheader' },
        this.getProductDetails(),
        { text: `Total: ${this.order.orderTotal}`, style: 'subheader' }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10] as [number, number, number, number]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5] as [number, number, number, number]
        }
      }
    };

    // Create the PDF
    (pdfMake as any) .vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).open();
  }

  getProductDetails() {
    const productDetails:any = [];
    this.order.products.forEach((product: any) => {
      productDetails.push(
        [
          { text: product.productName },
          { text: product.price },
          { text: product.productQuantity }
        ]
      );
    });
    return {
      table: {
        widths: ['*', '*', '*'],
        body: [
          [{ text: 'Product Name', style: 'tableHeader' },
          { text: 'Price', style: 'tableHeader' },
          { text: 'Quantity', style: 'tableHeader' }],
          ...productDetails
        ]
      }
    };
  }

}
