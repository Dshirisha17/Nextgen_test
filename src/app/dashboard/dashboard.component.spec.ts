import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should render nav bar', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-nav-bar')).not.toBeNull();
  });

  it('should render container', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-container')).not.toBeNull();
  });

  it('should render footer', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-footer-1')).not.toBeNull();
  });
});
