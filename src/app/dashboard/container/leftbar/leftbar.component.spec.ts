import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { LeftbarComponent } from './leftbar.component';
import { By } from '@angular/platform-browser';

describe('LeftbarComponent', () => {
  let component: LeftbarComponent;
  let fixture: ComponentFixture<LeftbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeftbarComponent],
      imports: [BrowserAnimationsModule, MatExpansionModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain four expansion panels', () => {
    const panels = fixture.debugElement.queryAll(By.css('mat-expansion-panel'));
    expect(panels.length).toBe(4);
  });

  it('should have correct titles in expansion panels', () => {
    const panelTitles = fixture.debugElement.queryAll(By.css('mat-panel-title'));
    const titles = panelTitles.map(title => title.nativeElement.textContent.trim());
    expect(titles).toEqual(['Accounts', 'Deposits', 'Pay Later', 'e-Statement']);
  });

  it('should call preventDefault when links are clicked', () => {
    spyOn(component, 'preventDefault');

    const links = fixture.debugElement.queryAll(By.css('a'));
    links.forEach(link => link.triggerEventHandler('click', { preventDefault: () => {} }));

    expect(component.preventDefault).toHaveBeenCalledTimes(12); // 3 links per panel * 4 panels = 12 links
  });

  it('should toggle panelOpenState when panel is opened and closed', () => {
    const panel = fixture.debugElement.query(By.css('mat-expansion-panel:nth-child(2)'));
    const panelComponent = panel.componentInstance;

    panelComponent.open();
    fixture.detectChanges();
    expect(component.panelOpenState).toBeTrue();

    panelComponent.close();
    fixture.detectChanges();
    expect(component.panelOpenState).toBeFalse();
  });
});
