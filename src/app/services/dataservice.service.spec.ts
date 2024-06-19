import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataserviceService } from './dataservice.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../config';

describe('DataserviceService', () => {
  let service: DataserviceService;
  let httpMock: HttpTestingController;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataserviceService, CookieService]
    });
    service = TestBed.inject(DataserviceService);
    httpMock = TestBed.inject(HttpTestingController);
    cookieService = TestBed.inject(CookieService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data successfully', () => {
    const dummyData = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' }
    ];

    service.fetchData().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${serverUrl}/login`);
    expect(req.request.method).toBe('GET');

    req.flush(dummyData);
  });

  it('should fetch transaction details successfully', () => {
    const dummyTransactionDetails = [
      { transactionId: 1, amount: 100, type: 'debit' },
      { transactionId: 2, amount: 200, type: 'credit' }
    ];

    spyOn(cookieService, 'get').and.returnValue('fake-jwt-token');

    service.getTransactionDetails().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummyTransactionDetails);
    });

    const req = httpMock.expectOne(`${serverUrl}/transactionhistory?bankid=rbs-rbs-a&accountid=12345`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');
    expect(req.request.headers.get('Authorization')).toBe('fake-jwt-token');

    req.flush(dummyTransactionDetails);
  });

  it('should handle fetch data error', () => {
    const errorResponse = {
      status: 404,
      statusText: 'Not Found'
    };

    service.fetchData().subscribe({
      next: () => fail('should have failed with 404 error'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    });

    const req = httpMock.expectOne(`${serverUrl}/login`);
    expect(req.request.method).toBe('GET');

    req.flush(null, errorResponse);
  });

  it('should handle transaction details error', () => {
    const errorResponse = {
      status: 401,
      statusText: 'Unauthorized'
    };

    spyOn(cookieService, 'get').and.returnValue('fake-jwt-token');

    service.getTransactionDetails().subscribe({
      next: () => fail('should have failed with 401 error'),
      error: (error) => {
        expect(error.status).toBe(401);
        expect(error.statusText).toBe('Unauthorized');
      }
    });

    const req = httpMock.expectOne(`${serverUrl}/transactionhistory?bankid=rbs-rbs-a&accountid=12345`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');
    expect(req.request.headers.get('Authorization')).toBe('fake-jwt-token');

    req.flush(null, errorResponse);
  });
});
