import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render background image and styled text', () => {
    const bankBg = fixture.nativeElement.querySelector('.bank_bg');
    expect(bankBg).toBeTruthy();

    // const bgImage = bankBg.querySelector('.bg_image');
    // expect(bgImage).toBeTruthy();
    // expect(bgImage.getAttribute('src')).toBe('/assets/images/bg1.jpg');

    const styledText = bankBg.querySelector('.styled-text');
    expect(styledText).toBeTruthy();
    expect(styledText.textContent.trim()).toBe('Stay connected to your accounts 24/7');
  });

  it('should render About Us section', () => {
    const aboutSection = fixture.nativeElement.querySelector('#About');
    expect(aboutSection).toBeTruthy();

    const title = aboutSection.querySelector('.title');
    expect(title).toBeTruthy();
    expect(title.textContent.trim()).toBe('About Us');

    const text = aboutSection.querySelector('.text1');
    expect(text).toBeTruthy();
    expect(text.textContent.trim()).toBe('We have everyday bank accounts to help you better manage your money and savings accounts to grow your money.');
  });

  it('should render Credit Card section', () => {
    const creditSection = fixture.nativeElement.querySelector('#Credit');
    expect(creditSection).toBeTruthy();

    const title = creditSection.querySelector('.title');
    expect(title).toBeTruthy();
    expect(title.textContent.trim()).toBe('Credit Card');

    const text = creditSection.querySelector('.text2');
    expect(text).toBeTruthy();
    expect(text.textContent.trim()).toBe('Elevate your purchasing power with our credit cards, offering convenient and secure transactions globally.');
  });

  it('should render Loans section', () => {
    const loansSection = fixture.nativeElement.querySelector('#Loans');
    expect(loansSection).toBeTruthy();

    const title = loansSection.querySelector('.title');
    expect(title).toBeTruthy();
    expect(title.textContent.trim()).toBe('Loans');

    const text = loansSection.querySelector('.text3');
    expect(text).toBeTruthy();
    expect(text.textContent.trim()).toBe('Our bank offers a range of loan products tailored to meet diverse financial needs, including home loans, personal loans, and business loans.');
  });
});
