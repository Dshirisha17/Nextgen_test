import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TransactionComponent } from './transaction.component';
import { DataserviceService } from '../services/dataservice.service';
import { DecimalPlacesPipe } from '../decimal-places.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Transactions } from '../interfaces/transactions';  // Correct import
import { throwError } from 'rxjs';


describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;
  let mockDataService: jasmine.SpyObj<DataserviceService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataserviceService', ['getTransactionDetails']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [TransactionComponent, DecimalPlacesPipe],
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
      ],
      providers: [
        { provide: DataserviceService, useValue: mockDataService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: {
            queryParams: of({ accountDetails: '{"accountNumber": "12345", "availableBalance": 1000, "chequesInClearing": 200 }'})
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Add this schema to suppress errors related to custom elements
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//   it('should fetch transaction details', fakeAsync(() => {
//     // const mockTransactionData: Observable<{ transactions: Transactions[] }> = of({ transactions: [
//     //   { date: '2024-06-01', bankname: 'ABC Bank', transaction_type: 'CR', transaction_value: 500, new_balance: 1500 },
//     //   { date: '2024-06-02', bankname: 'XYZ Bank', transaction_type: 'DR', transaction_value: 200, new_balance: 1300 }
//     // ]});
//     const mockTransactionData: Observable<Transactions[]> = of([
//       { date: '2024-06-01', bankname: 'ABC Bank', transaction_type: 'CR', transaction_value: 500, new_balance: 1500 },
//       { date: '2024-06-02', bankname: 'XYZ Bank', transaction_type: 'DR', transaction_value: 200, new_balance: 1300 }
//     ]);
    

//     mockDataService.getTransactionDetails.and.returnValue(mockTransactionData);

//     fixture.detectChanges(); // Trigger initial data binding
//     tick(); // Simulate the passage of time for the async operations
//     fixture.detectChanges(); // Trigger change detection

//     expect(component.transactions.length).toBe(2);
//     expect(component.transactions[0]).toEqual({ date: '2024-06-01', bankname: 'ABC Bank', transaction_type: 'CR', transaction_value: 500, new_balance: 1500 });
//     expect(component.transactions[1]).toEqual({ date: '2024-06-02', bankname: 'XYZ Bank', transaction_type: 'DR', transaction_value: 200, new_balance: 1300 });
//     expect(component.selectedAccount.accountNumber).toBe('12345');
//     expect(component.selectedAccount.availableBalance).toBe(1000);
//     expect(component.selectedAccount.chequesInClearing).toBe(200);
//   }));
it('should fetch transaction details and handle error', fakeAsync(() => {
  const mockTransactionData: Transactions[] = [
    { date: '2024-06-01', bankname: 'ABC Bank', transaction_type: 'CR', transaction_value: 500, new_balance: 1500 },
    { date: '2024-06-02', bankname: 'XYZ Bank', transaction_type: 'DR', transaction_value: 200, new_balance: 1300 }
  ];

  // Return the mock data as an observable of the array
  mockDataService.getTransactionDetails.and.returnValue(of(mockTransactionData));

  fixture.detectChanges(); // Trigger initial data binding
  tick(); // Simulate the passage of time for the async operations
  fixture.detectChanges(); // Trigger change detection

  // Assert that the component processed the data correctly
  expect(component.transactions.length).toBe(2);
  expect(component.transactions[0]).toEqual(mockTransactionData[0]);
  expect(component.transactions[1]).toEqual(mockTransactionData[1]);

  // Simulate error response
  const errorResponse = { status: 500, statusText: 'Internal Server Error' };
  mockDataService.getTransactionDetails.and.returnValue(throwError(errorResponse));

  // Trigger another change detection cycle
  fixture.detectChanges();
  tick();

  // Check if error handling logic is invoked
  expect(component.errorMessage).toBe('Error fetching transaction details: Internal Server Error');
}));


});
