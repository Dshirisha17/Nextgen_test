import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataserviceService } from '../services/dataservice.service';
import { Transactions } from '../interfaces/transactions';
import { DecimalPlacesPipe } from '../decimal-places.pipe';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator,PageEvent} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
 
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers: [DecimalPlacesPipe]
})
export class TransactionComponent implements OnInit {
  selectedAccount: any;
  transactions: Transactions[] = [];
  dataSource!: MatTableDataSource<Transactions>; // Declare dataSource with definite assignment assertion
  errorMessage: string = '';
 
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Add definite assignment assertion for paginator
  @ViewChild(MatSort) sort!: MatSort; // Add definite assignment assertion for sort
  pageSize = 5; // Default page size
  pageSizeOptions = [2, 3, 4, 5]; // Default page size options
 
  displayedColumns: string[] = ['serialNumber', 'transactionDate', 'transactionRemark', 'creditDebit', 'amountUSD', 'balance'];
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataserviceService,
    private decimalPlacesPipe: DecimalPlacesPipe
  ) {}
 
  ngOnInit(): void {
     
    this.fetchTransactionDetails();
    // this.changePageSize();
    // window.addEventListener('resize', () => this.changePageSize());
  }
 
  fetchTransactionDetails(): void {
    this.route.queryParams.subscribe(params => {
      if (params.accountDetails) {
        this.selectedAccount = JSON.parse(params.accountDetails);
        this.dataService.getTransactionDetails().subscribe({
          next: (data: any) => {
            if (Array.isArray(data.transactions)) {

              const lastTransaction = data.transactions[data.transactions.length - 1];
              const lastBalance = lastTransaction.new_balance;
              this.selectedAccount.availableBalance = this.decimalPlacesPipe.transform(lastBalance)             
               this.transactions = data.transactions.map(
                (transaction, index) => ({
                  serialNumber: index + 1,
                  transactionDate: transaction.date,
                  transactionRemark: transaction.bankname,
                  creditDebit: this.mapTransactionType(transaction.transaction_type), // Change here
                  amountUSD: this.decimalPlacesPipe.transform(Math.abs(transaction.transaction_value)),
                  balance: this.decimalPlacesPipe.transform(transaction.new_balance)
                })
              );
              this.dataSource = new MatTableDataSource(this.transactions);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.changePageSize();
            } else {
              console.error('Transaction data is not an array:', data);
            }
          },
          error: error => {
            console.error('Error fetching transaction details:', error);
          }
        });
      }
    });
  }

  // Function to map backend transaction types to more descriptive terms
  private mapTransactionType(type: string): string {
    switch (type) {
      case 'CR':
        return 'Credit';
      case 'DR':
        return 'Debit';
      default:
        return 'Unknown';
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
  changePageSize(): void {
    // Check if window is defined (to handle server-side rendering)
    if (typeof window !== 'undefined') {
      // Define screen width breakpoints for changing page size
      const screenWidthThreshold = 1366; // Adjust as needed
      const screenWidthWideThreshold = 1920; // Adjust as needed
    
      // Get the current window width
      const windowWidth = window.innerWidth;
    
      // Check if the paginator is defined and initialized
      if (this.paginator && this.paginator.page) {
        // Check window width and apply appropriate page size
        if (windowWidth === 1280) {
          // If window width is exactly 1280, set the page size to 2
          this.paginator.pageSize = 2;
          this.paginator.pageSizeOptions = [2];
        } else if (windowWidth <= 1280) {
          // If below 1280, set the page size to 4
          this.paginator.pageSize = 4;
          this.paginator.pageSizeOptions = [2, 3, 4, 5];
        } else if (windowWidth === 1440 || windowWidth === 1600 ) {
          // If window width is 1440 or 1600, or less than 1600, set the page size to 3
          this.paginator.pageSize = 3;
          this.paginator.pageSizeOptions = [2, 3, 4, 5];
        } else if (windowWidth <= screenWidthThreshold) {
          // If below threshold but above 1280, set the page size to 2
          this.paginator.pageSize = 2;
          this.paginator.pageSizeOptions = [2];
        } else if (windowWidth <= screenWidthWideThreshold) {
          // If below wide threshold but above regular threshold, set the page size to 5
          this.paginator.pageSize = 5;
          this.paginator.pageSizeOptions = [2, 3, 4, 5];
        } else {
          // If above wide threshold, keep the default values
          this.paginator.pageSize = 5;
          this.paginator.pageSizeOptions = [2, 3, 4, 5];
        }
    
        // Manually trigger the paginator's page change event to apply the changes
        const pageEvent = new PageEvent();
        pageEvent.pageIndex = this.paginator.pageIndex;
        pageEvent.pageSize = this.paginator.pageSize;
    
        // Emit the page event to trigger pagination with new settings
        this.paginator.page.emit(pageEvent);
      }
    }
  }
  
  
}
