import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent1 } from './nav-bar.component';
import { LogoutComponent } from './logout/logout.component'; 

import { By } from '@angular/platform-browser';

describe('NavBarComponent1', () => {
  let component: NavBarComponent1;
  let fixture: ComponentFixture<NavBarComponent1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent1, LogoutComponent] 
    }).compileComponents();
    
    fixture = TestBed.createComponent(NavBarComponent1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the logo', () => {
    const logoElement = fixture.debugElement.query(By.css('.navbar-brand.logo img'));
    expect(logoElement).toBeTruthy();
    // expect(logoElement.nativeElement.getAttribute('src')).toContain('/assets/images/logo.png');
  });

  it('should contain the bank name', () => {
    const bankNameElement = fixture.debugElement.query(By.css('.navbar-brand.logo .navbar-text'));
    expect(bankNameElement.nativeElement.textContent.trim()).toBe('NEXT GEN BANK');
  });

  it('should contain the logout button', () => {
    const logoutButtonElement = fixture.debugElement.query(By.css('app-logout'));
    expect(logoutButtonElement).toBeTruthy();
  });
});
