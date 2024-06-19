import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render customer care section', () => {
    const customerCareSection = fixture.nativeElement.querySelector('.col-lg-4:nth-child(1)');
    expect(customerCareSection).toBeTruthy();

    const phoneNumber = customerCareSection.querySelector('.phone-number');
    expect(phoneNumber.textContent.trim()).toBe('100101-011');

    // const icon = customerCareSection.querySelector('.icon');
    // expect(icon).toBeTruthy();
    // expect(icon.getAttribute('src')).toBe('/assets/images/cell.png');
  });

  it('should render get social section', () => {
    const getSocialSection = fixture.nativeElement.querySelector('.col-lg-4:nth-child(2)');
    expect(getSocialSection).toBeTruthy();

    const icons = getSocialSection.querySelectorAll('.icons img');
    expect(icons.length).toBe(4);
  });

  it('should render copyright section', () => {
    const copyrightSection = fixture.nativeElement.querySelector('.col-lg-4:nth-child(3)');
    expect(copyrightSection).toBeTruthy();

    const copyContent = copyrightSection.querySelector('.copy_content');
    expect(copyContent.textContent.trim()).toBe('2024 Next Gen Bank');
  });
});
