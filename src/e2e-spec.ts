import { browser, by, element, protractor } from 'protractor';
import axios from 'axios';
import { serverUrl } from './app/config';

// Helper function to get the authentication token
async function getAuthToken(username: string, password: string): Promise<string> {
  const url = `${serverUrl}/login`;
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const body = `username=${username}&password=${password}`;

  try {
    const response = await axios.post(url, body, { headers: headers });
    return response.data.token; // Adjust based on your API's response structure
  } catch (error) {
    throw new Error(`Failed to get token: ${error.message}`);
  }
}

describe('Login and Navigation Functionality with Custom Headers', () => {
  let authToken: string;

  beforeAll(async () => {
    // Get the authentication token before running the tests
    authToken = await getAuthToken('sandhata_demo', 'sandhata');
  });

  beforeEach(async () => {
    // Navigate to the initial page or home page
    await browser.get('http://localhost:4200');
  });

  it('should ensure the login button is clickable', async () => {
    // Check if the login button is clickable
    const loginButton = element(by.id('login_button'));
    expect(await loginButton.isEnabled()).toBe(true);
  });

  it('should populate the username and password fields', async () => {
    // Populate the username and password fields
    const usernameInput = element(by.id('username'));
    const passwordInput = element(by.id('password'));

    await usernameInput.sendKeys('sandhata_demo');
    await passwordInput.sendKeys('sandhata');

    // Verify if the username and password fields are populated
    expect(await usernameInput.getAttribute('value')).toBe('sandhata_demo');
    expect(await passwordInput.getAttribute('value')).toBe('sandhata');
  });

  it('should navigate to the dashboard page after successful login', async () => {
    // Perform login
    const loginButton = element(by.id('login_button'));
    await loginButton.click();
    const submitButton = element(by.css('.submit-button'));
    await submitButton.click();

    // Wait for navigation to complete
    await browser.waitForAngular();

    // Assert that the URL contains '/dashboard' after successful login
    expect(await browser.getCurrentUrl()).toContain('/dashboard');
  });

  it('should display an error message for invalid login credentials', async () => {
    // Perform login with invalid credentials
    const loginButton = element(by.id('login_button'));
    await loginButton.click();
    const usernameInput = element(by.id('username'));
    const passwordInput = element(by.id('password'));
    await usernameInput.sendKeys('invalid_username');
    await passwordInput.sendKeys('invalid_password');
    const submitButton = element(by.css('.submit-button'));
    await submitButton.click();

    // Wait for error message to appear
    const errorMessage = element(by.css('.error-message'));
    await browser.wait(protractor.ExpectedConditions.visibilityOf(errorMessage), 5000, 'Error message not displayed');

    // Verify if the error message is displayed
    expect(await errorMessage.isPresent()).toBe(true);
  });

  describe('Navigation to Transaction Page', () => {
    beforeEach(async () => {
      // Navigate to the dashboard page (assumes you are already logged in)
      await browser.get('http://localhost:4200/dashboard');
    });

    it('should navigate to the dashboard page', async () => {
      // Assert that the URL contains '/dashboard'
      expect(await browser.getCurrentUrl()).toContain('/dashboard');
    });

    it('should click on the current account', async () => {
      // Click on the "current account" to navigate to the Transaction page
      const currentAccountLink = element(by.cssContainingText('.bank', 'Current Account'));
      await currentAccountLink.click();
    });

    it('should ensure redirection to the transaction page', async () => {
      // Wait for navigation to the Transaction page
      await browser.wait(protractor.ExpectedConditions.urlContains('/transaction'), 5000, 'URL does not contain /transaction after clicking on current account');

      // Assert that the URL is the Transaction page
      expect(await browser.getCurrentUrl()).toContain('/transaction');
    });

    it('should verify balance in the transaction history table is not zero', async () => {
      // Find the balance column cells in the transaction table
      const balanceCells = element.all(by.css('td.balance-cell'));

      // Assert that no balance is zero
      const balances = await balanceCells.getText();
      for (const balance of balances) {
        expect(parseFloat(balance.replace('USD ', ''))).not.toBe(0);
      }
    });
  });

  describe('Back Button Functionality', () => {
    beforeEach(async () => {
      // Navigate to the transaction page
      await browser.get('http://localhost:4200/transaction');
    });

    it('should navigate to the transaction page', async () => {
      // Assert that the URL contains '/transaction'
      expect(await browser.getCurrentUrl()).toContain('/transaction');
    });

    it('should click the back button and ensure redirection back to the dashboard page', async () => {
      // Click the back button
      const backButton = element(by.css('.back-button'));
      await backButton.click();

      // Wait for navigation to complete
      await browser.waitForAngular();

      // Assert that the URL is redirected back to the dashboard page
      expect(await browser.getCurrentUrl()).toContain('/dashboard');
    });
  });

  describe('Logout Functionality', () => {
    beforeEach(async () => {
      // Navigate to the dashboard page (assumes you are already logged in)
      await browser.get('http://localhost:4200/dashboard');
    });

    it('should have a logout button that is clickable', async () => {
      // Find the logout button
      const logoutButton = element(by.id('logout_button'));
      expect(await logoutButton.isPresent()).toBe(true);
      expect(await logoutButton.isEnabled()).toBe(true);
    });

    it('should log out and redirect to the login page', async () => {
      // Click the logout button
      const logoutButton = element(by.id('logout_button'));
      await logoutButton.click();

      // Wait for navigation to the login page
      await browser.wait(protractor.ExpectedConditions.urlContains('/login'), 5000, 'URL does not contain /login after clicking logout');

      // Assert that the URL is the login page
      expect(await browser.getCurrentUrl()).toContain('/login');
    });
  });
});
