import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../../../services/dataservice.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-middlebar',
  templateUrl: './middlebar.component.html',
  styleUrl: './middlebar.component.css'
})
export class MiddlebarComponent implements OnInit {
  account: any;

  constructor(private dataService: DataserviceService,private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {
    // Retrieve account details from cookies
    const accountData = this.cookieService.get('account');
    if (accountData) {
      this.account = JSON.parse(accountData);
    }
  }
  
  navigateToTransaction(): void {
    const accountDetails = {
      id: "1",
      accountNumber: "122345",
      chequesInClearing: "0.00"
    };

    // Assuming getTransactionDetails returns the account details
    this.dataService.getTransactionDetails().subscribe({
      next: (transactionHistory) => {
        this.router.navigate(['/transaction'], { queryParams: { accountDetails: JSON.stringify(accountDetails), transactionHistory: JSON.stringify(transactionHistory) } });
      },
      error: (error) => {
        console.error('Error fetching transaction details:', error);
      }
    });
  }
}

