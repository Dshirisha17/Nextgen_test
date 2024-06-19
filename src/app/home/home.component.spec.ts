import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from '../navbar/login/login.component'; // Import app-login component
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        NavbarComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent // Declare app-login component
      ],
      imports: [
        HttpClientModule 
      
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Navbar, Header, and Footer components', () => {
    const navbarElement = fixture.nativeElement.querySelector('app-navbar');
    expect(navbarElement).toBeTruthy();

    const headerElement = fixture.nativeElement.querySelector('app-header');
    expect(headerElement).toBeTruthy();

    const footerElement = fixture.nativeElement.querySelector('app-footer');
    expect(footerElement).toBeTruthy();
  });
});
