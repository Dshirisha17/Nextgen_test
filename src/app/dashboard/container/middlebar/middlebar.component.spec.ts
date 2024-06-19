import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MiddlebarComponent } from './middlebar.component';
import { DataserviceService } from '../../../services/dataservice.service';
import { CookieService } from 'ngx-cookie-service';

describe('MiddlebarComponent', () => {
  let component: MiddlebarComponent;
  let fixture: ComponentFixture<MiddlebarComponent>;
  let dataService: jasmine.SpyObj<DataserviceService>;
  let router: jasmine.SpyObj<Router>;
  let cookieService: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const dataServiceSpy = jasmine.createSpyObj('DataserviceService', ['getTransactionDetails']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const cookieServiceSpy = jasmine.createSpyObj('CookieService', ['get']);

    TestBed.configureTestingModule({
      declarations: [MiddlebarComponent],
      providers: [
        { provide: DataserviceService, useValue: dataServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: CookieService, useValue: cookieServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MiddlebarComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataserviceService) as jasmine.SpyObj<DataserviceService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize account from cookie on init', () => {
    const mockAccount = { name: 'Test Account', accountType: 'Savings', accountNumber: '123456', balance: '1000.00' };
    cookieService.get.and.returnValue(JSON.stringify(mockAccount));

    component.ngOnInit();

    expect(component.account).toEqual(mockAccount);
    expect(cookieService.get).toHaveBeenCalledWith('account');
  });

  it('should navigate to transaction page with correct query params', () => {
    const mockTransactionHistory = [{ id: 1, details: 'Sample transaction' }];
    const accountDetails = { id: "1", accountNumber: "122345", chequesInClearing: "0.00" };

    dataService.getTransactionDetails.and.returnValue(of(mockTransactionHistory));

    component.navigateToTransaction();

    expect(dataService.getTransactionDetails).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/transaction'], {
      queryParams: {
        accountDetails: JSON.stringify(accountDetails),
        transactionHistory: JSON.stringify(mockTransactionHistory)
      }
    });
  });
});
