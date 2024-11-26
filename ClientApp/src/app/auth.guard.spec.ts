import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let loginService: LoginService;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    // Setup the testing module
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],  // Import the RouterTestingModule to mock routing behavior
      providers: [
        AuthGuard,  // Add the AuthGuard to the provider list
        {
          provide: LoginService,  // Provide the LoginService with mock implementation
          useValue: {
            getToken: jasmine.createSpy('getToken'),
            hasTokenExpired: jasmine.createSpy('hasTokenExpired')  // Mock token expiration check
          }
        },
        Router,  // Mock the Router for navigation testing
        Location // For location-based tests (optional)
      ]
    });

    // Inject necessary services
    authGuard = TestBed.inject(AuthGuard);
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();  // Ensure the guard is instantiated properly
  });

  it('should allow access if the token is valid (not expired)', () => {
    // Simulate the behavior of having a valid token (token not expired)
    localStorage.setItem('token', 'valid-token');
    localStorage.setItem('tokenExpiration', (new Date().getTime() + 15 * 60 * 1000).toString());  // Set expiration 15 minutes from now

    // Call the canActivate method (this should return true because the token is valid)
    const result = authGuard.canActivate();

    // Assert that the result is true (access is allowed)
    expect(result).toBeTrue();
  });

  it('should redirect to login if token is missing', () => {
    // Simulate missing token in localStorage
    localStorage.removeItem('token');

    // Spy on the router's navigate method to check if the user is redirected to login
    const navigateSpy = spyOn(router, 'navigate');

    // Call the canActivate method
    const result = authGuard.canActivate();

    // Assert that the result is false (access denied)
    expect(result).toBeFalse();

    // Assert that the router navigates to the login page
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should redirect to login if token is expired', () => {
    // Simulate expired token by setting the expiration time to the past
    localStorage.setItem('token', 'expired-token');
    localStorage.setItem('tokenExpiration', (new Date().getTime() - 1).toString());  // Set expiration to the past

    // Spy on the router's navigate method to check if the user is redirected to login
    const navigateSpy = spyOn(router, 'navigate');

    // Call the canActivate method
    const result = authGuard.canActivate();

    // Assert that the result is false (access denied)
    expect(result).toBeFalse();

    // Assert that the router navigates to the login page
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
