// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { of, throwError } from 'rxjs';
// import { CookieService } from 'ngx-cookie-service';
// import { Router } from '@angular/router'; // Make sure to import Router

// import { LoginComponent } from './login.component';
// import { AuthService } from '../../services/auth.service';
// import { DataserviceService } from '../../services/dataservice.service';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let mockAuthService: jasmine.SpyObj<AuthService>;
//   let mockCookieService: jasmine.SpyObj<CookieService>;
//   let mockRouter: Router; // Declare mockRouter with type Router
//   beforeEach(async () => {
//     mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
//     mockCookieService = jasmine.createSpyObj('CookieService', ['set']);
  
//     await TestBed.configureTestingModule({
//       declarations: [LoginComponent],
//       imports: [
//         ReactiveFormsModule,
//         RouterTestingModule,
//         HttpClientTestingModule
//       ],
//       providers: [
//         { provide: AuthService, useValue: mockAuthService },
//         { provide: CookieService, useValue: mockCookieService }
//       ]
//     }).compileComponents();
  
//     // Get the Router instance
//     mockRouter = TestBed.inject(Router); // Use TestBed.inject to get the Router instance
  
//     // Stub the navigateByUrl method
//     spyOn(mockRouter, 'navigateByUrl').and.stub();
  
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
  

//   // beforeEach(async () => {
//   //   mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
//   //   mockCookieService = jasmine.createSpyObj('CookieService', ['set']);
    

//   //   await TestBed.configureTestingModule({
//   //     declarations: [LoginComponent],
//   //     imports: [
//   //       ReactiveFormsModule,
//   //       RouterTestingModule,
//   //       HttpClientTestingModule
//   //     ],
//   //     providers: [
//   //       { provide: AuthService, useValue: mockAuthService },
//   //       { provide: CookieService, useValue: mockCookieService }
//   //     ]
//   //   }).compileComponents();

//   //   // Get the Router instance
//   //   mockRouter = TestBed.inject(Router); // Use TestBed.inject to get the Router instance

//   //   fixture = TestBed.createComponent(LoginComponent);
//   //   component = fixture.componentInstance;
//   //   fixture.detectChanges();
//   // });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize login form', () => {
//     expect(component.loginForm).toBeDefined();
//     expect(component.loginForm.controls['username']).toBeDefined();
//     expect(component.loginForm.controls['password']).toBeDefined();
//   });

//   it('should not login if form is invalid', () => {
//     component.loginForm.controls['username'].setValue('');
//     component.loginForm.controls['password'].setValue('');

//     component.login();

//     expect(mockAuthService.login).not.toHaveBeenCalled();
//   });

//   // it('should login and navigate to dashboard on successful login', () => {
//   //   const responseData = {
//   //     token: 'mock-token',
//   //     account: 'mock-account',
//   //     balance: { amount: 1000 }
//   //   };
  
//   //   // Setup AuthService login to return an observable of successful login
//   //   mockAuthService.login.and.returnValue(of(responseData));
  
//   //   // Set username and password
//   //   component.loginForm.controls['username'].setValue('testuser');
//   //   component.loginForm.controls['password'].setValue('testpassword');
  
//   //   // Call login method
//   //   component.login();
  
//   //   // Expect AuthService login to have been called with the provided credentials
//   //   expect(mockAuthService.login).toHaveBeenCalledWith('testuser', 'testpassword');
  
//   //   // Expect CookieService to have been called to set cookies
//   //   expect(mockCookieService.set).toHaveBeenCalledWith('token', responseData.token);
//   //   expect(mockCookieService.set).toHaveBeenCalledWith('account', JSON.stringify({
//   //     name: 'John',
//   //     accountType: 'Current Account',
//   //     accountNumber: responseData.account,
//   //     balance: responseData.balance.amount
//   //   }));
  
//   //   // Expect Router.navigateByUrl to have been called with '/dashboard'
//   //   expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/dashboard', jasmine.any(Object));
//   // });
//   it('should login and navigate to dashboard on successful login', () => {
//     const responseData = {
//       token: 'mock-token',
//       account: 'mock-account',
//       balance: { amount: 1000 }
//     };
  
//     mockAuthService.login.and.returnValue(of(responseData));
  
//     component.loginForm.controls['username'].setValue('testuser');
//     component.loginForm.controls['password'].setValue('testpassword');
  
//     component.login();
  
//     expect(mockAuthService.login).toHaveBeenCalledWith('testuser', 'testpassword');
//     expect(mockCookieService.set).toHaveBeenCalledWith('token', responseData.token);
//     expect(mockCookieService.set).toHaveBeenCalledWith('account', JSON.stringify({
//       name: 'John',
//       accountType: 'Current Account',
//       accountNumber: responseData.account,
//       balance: responseData.balance.amount
//     }));
//     expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/dashboard', jasmine.any(Object));
//   });
  
  
//   it('should handle login error', () => {
//     const errorResponse = { message: 'Login failed' };
//     mockAuthService.login.and.returnValue(throwError(errorResponse));

//     component.loginForm.controls['username'].setValue('testuser');
//     component.loginForm.controls['password'].setValue('testpassword');

//     component.login();

//     expect(mockAuthService.login).toHaveBeenCalledWith('testuser', 'testpassword');
//     // Add any additional checks here to verify error handling, such as setting an error message
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { DataserviceService } from '../../services/dataservice.service';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockAuthService {
  login(username: string, password: string) {
    if (username === 'validUser' && password === 'validPass') {
      return of({
        token: 'fake-jwt-token',
        account: '123456789',
        balance: { amount: 1000 }
      });
    } else {
      return throwError('Invalid credentials');
    }
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let cookieService: CookieService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      // imports: [ReactiveFormsModule],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
        CookieService,
        DataserviceService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login form', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('username')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();
  });

  it('should show login form when openLoginForm is called', () => {
    component.openLoginForm();
    expect(component.showLoginForm).toBeTrue();
  });

  it('should hide login form when closeLoginForm is called', () => {
    component.closeLoginForm();
    expect(component.showLoginForm).toBeFalse();
  });

  it('should mark username and password as required', () => {
    const usernameControl = component.loginForm.get('username');
    const passwordControl = component.loginForm.get('password');

    usernameControl.setValue('');
    passwordControl.setValue('');

    expect(usernameControl.hasError('required')).toBeTrue();
    expect(passwordControl.hasError('required')).toBeTrue();
  });

  it('should not login if form is invalid', () => {
    spyOn(authService, 'login').and.callThrough();
    component.login();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should login successfully with valid credentials', () => {
    spyOn(authService, 'login').and.callThrough();
    component.loginForm.setValue({ username: 'validUser', password: 'validPass' });
    component.login();
    expect(authService.login).toHaveBeenCalledWith('validUser', 'validPass');
    expect(cookieService.get('token')).toBe('fake-jwt-token');
    expect(cookieService.get('account')).toBe(JSON.stringify({
      name: 'John',
      accountType: 'Current Account',
      accountNumber: '123456789',
      balance: 1000
    }));
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle login error', () => {
    spyOn(authService, 'login').and.callThrough();
    spyOn(console, 'error');
    component.loginForm.setValue({ username: 'invalidUser', password: 'invalidPass' });
    component.login();
    expect(authService.login).toHaveBeenCalledWith('invalidUser', 'invalidPass');
    expect(console.error).toHaveBeenCalledWith('Login error:', 'Invalid credentials');
  });
});
