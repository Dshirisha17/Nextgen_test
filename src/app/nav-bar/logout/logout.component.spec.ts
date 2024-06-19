import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LogoutComponent } from './logout.component';
import { Router } from '@angular/router';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoutComponent],
      imports: [RouterTestingModule], // RouterTestingModule is imported without additional configuration
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    // Spy on navigateByUrl
    spyOn(router, 'navigateByUrl').and.callThrough();; // Ensure that the original method is called

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should navigate to home page on logout', () => {
  //   // Call the logout method
  //   component.logout();

  //   // Expect that navigateByUrl is called with the correct arguments
  //   // expect(router.navigateByUrl).toHaveBeenCalledWith('/home', ({ skipLocationChange: true }));
  //   // expect(router.navigateByUrl).toHaveBeenCalledWith('/home;skipLocationChange=true', Object({ skipLocationChange: false,}));
  //   // expect(router.navigateByUrl).toHaveBeenCalledWith('/home;skipLocationChange=true', jasmine.objectContaining({ skipLocationChange: false }));
  //   // expect(router.navigateByUrl).toHaveBeenCalledWith('/home', jasmine.objectContaining({ skipLocationChange: true }));
  //   // expect(router.navigateByUrl).toHaveBeenCalledWith('/home', jasmine.objectContaining(Object({ skipLocationChange: true })))
  //   expect(router.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('/home'), jasmine.objectContaining({ skipLocationChange: true }));
  // });
  it('should navigate to home page on logout', () => {
    // Call the logout method
    component.logout();
  
    // Get the arguments passed to navigateByUrl
    const [urlTree, navigationExtras] = (router.navigateByUrl as jasmine.Spy).calls.mostRecent().args;
  
    // Convert the UrlTree to a string URL
    const url = router.serializeUrl(urlTree);
  
    // Expect that the URL contains '/home'
    expect(url.includes('/home')).toBeTrue();
    
    // Expect that skipLocationChange is false
    expect(navigationExtras.skipLocationChange).toBeFalse();
  });
  
  
  
  
});
