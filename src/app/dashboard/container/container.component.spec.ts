import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContainerComponent } from './container.component';
import { LeftbarComponent } from './leftbar/leftbar.component';
import { MiddlebarComponent } from './middlebar/middlebar.component';
import { RightbarComponent } from './rightbar/rightbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { MatExpansionModule } from '@angular/material/expansion'; // Import MatExpansionModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ContainerComponent,
        LeftbarComponent,
        MiddlebarComponent,
        RightbarComponent
      ],
      imports: [
        HttpClientTestingModule, // Add HttpClientTestingModule
        MatExpansionModule, // Add MatAccordionModule
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-leftbar', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-leftbar')).not.toBeNull();
  });

  it('should render app-middlebar', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-middlebar')).not.toBeNull();
  });

  it('should render app-rightbar', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-rightbar')).not.toBeNull();
  });
});
