import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RightbarComponent } from './rightbar.component';

describe('RightbarComponent', () => {
  let component: RightbarComponent;
  let fixture: ComponentFixture<RightbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RightbarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "My Messages" section', () => {
    const myMessagesTitle = fixture.debugElement.query(By.css('.sub-container:nth-child(1) .title3')).nativeElement;
    expect(myMessagesTitle.textContent).toBe('My Messages');

    const myMessagesContent = fixture.debugElement.query(By.css('.sub-container:nth-child(1) .content')).nativeElement;
    expect(myMessagesContent.textContent).toContain('You have 0 new messages');
    expect(myMessagesContent.textContent).toContain('Go to My messages');
  });

  it('should render "My Details & Preferences" section', () => {
    const myDetailsTitle = fixture.debugElement.query(By.css('.sub-container:nth-child(2) .title3')).nativeElement;
    expect(myDetailsTitle.textContent).toBe('My Details & Preferences');

    const myDetailsContent = fixture.debugElement.query(By.css('.sub-container:nth-child(2) .content')).nativeElement;
    expect(myDetailsContent.textContent).toContain('Home: Add details now');
    expect(myDetailsContent.textContent).toContain('Work: Add details now');
    expect(myDetailsContent.textContent).toContain('Mobile: 809******7');
    expect(myDetailsContent.textContent).toContain('Update');
  });

  it('should render "Need a little help ?" section', () => {
    const needHelpTitle = fixture.debugElement.query(By.css('.sub-container:nth-child(3) .title3')).nativeElement;
    expect(needHelpTitle.textContent).toBe('Need a little help ?');

    const needHelpContent = fixture.debugElement.query(By.css('.sub-container:nth-child(3) .content')).nativeElement;
    expect(needHelpContent.textContent).toContain('Talk to us and see how');
    expect(needHelpContent.textContent).toContain('we could help you');
    expect(needHelpContent.textContent).toContain('Find out more');
  });

  it('should call preventDefault when links are clicked', () => {
    spyOn(component, 'preventDefault');

    const links = fixture.debugElement.queryAll(By.css('a'));
    links.forEach(link => link.triggerEventHandler('click', { preventDefault: () => {} }));

    expect(component.preventDefault).toHaveBeenCalledTimes(3); // 1 link per section = 3 links
  });
});
