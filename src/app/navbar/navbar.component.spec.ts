import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { LoginComponent } from '../navbar/login/login.component'; // Updated path to LoginComponent
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent, LoginComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
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

  it('should contain the brand text', () => {
    const brandTextElement = fixture.debugElement.query(By.css('.brand-text .navbar-text'));
    expect(brandTextElement.nativeElement.textContent.trim()).toBe('NEXT GEN BANK');
  });

  it('should contain navigation links', () => {
    const navLinks = fixture.debugElement.queryAll(By.css('.navbar-nav .nav-item'));
    expect(navLinks.length).toBe(5); // Assuming there are 5 navigation links
    expect(navLinks[0].nativeElement.textContent.trim()).toBe('Home');
    expect(navLinks[1].nativeElement.textContent.trim()).toBe('About Us');
    expect(navLinks[2].nativeElement.textContent.trim()).toBe('Loans');
    expect(navLinks[3].nativeElement.textContent.trim()).toBe('Credit Card');
    expect(navLinks[4].nativeElement.textContent.trim()).toBe('Contact Us');
  });

  it('should contain the login component', () => {
    const loginComponent = fixture.debugElement.query(By.css('app-login'));
    expect(loginComponent).toBeTruthy();
  });
});
