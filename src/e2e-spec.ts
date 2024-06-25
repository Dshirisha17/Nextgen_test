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
    return response.data.token;
  } catch (error) {
    throw new Error(`Failed to get token: ${error.message}`);
  }
}

describe('Login Functionality', () => {
  let authToken: string;

  beforeAll(async () => {
    // Get the authentication token before running the tests
    authToken = await getAuthToken('sandhata_demo', 'sandhata');
  });

  beforeEach(async () => {
    // Navigate to the initial page or home page
    await browser.get('http://10.10.1.135:400');
  });

  it('should open the login form, enter credentials, and log in with custom headers', async () => {
    // Open the login form
    const loginButton = element(by.id('login_button'));
    await loginButton.click();
    // Wait for the login form to be displayed
    const loginForm = element(by.id('login-form'));
    await browser.wait(protractor.ExpectedConditions.visibilityOf(loginForm), 5000, 'Login form taking too long to appear');
    // Enter valid username and password
    const usernameInput = element(by.id('username'));
    const passwordInput = element(by.id('password'));
    await usernameInput.sendKeys('sandhata_demo');
    await passwordInput.sendKeys('sandhata');
    // Submit the login form
    const submitButton = element(by.css('.submit-button'));
    await submitButton.click();
    // Wait for navigation to complete
    await browser.waitForAngular();
    // Assert that the URL contains '/dashboard' after successful login
    expect(await browser.getCurrentUrl()).toContain('/dashboard');
  });

  describe('Navigation to Transaction Page', () => {
    beforeEach(async () => {
      // Navigate to the dashboard page (assumes you are already logged in)
      await browser.get('http://10.10.1.135:400/dashboard');
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
      // Click on the current account link
      const currentAccountLink = element(by.cssContainingText('.bank', 'Current Account'));
      await currentAccountLink.click();
      // Wait for navigation to the Transaction page
      await browser.wait(protractor.ExpectedConditions.urlContains('/transaction'), 10000, 'URL does not contain /transaction after clicking on current account');
      // Assert that the URL is the Transaction page
      expect(await browser.getCurrentUrl()).toContain('/transaction');
    });

    it('should verify balance in the transaction history table is not zero', async () => {
      // Click on the current account link
      const currentAccountLink = element(by.cssContainingText('.bank', 'Current Account'));
      await currentAccountLink.click();
      // Wait for the balance cells container to be present
      const balanceCellsContainer = element(by.css('.table-container'));
      await browser.wait(protractor.ExpectedConditions.presenceOf(balanceCellsContainer), 10000, 'Balance cells container not found');
      // Find all cells in the balance column
      const balanceColumnCells = await element.all(by.css('.table-container td:nth-child(6)'));
      // Iterate over the balance column cells
      for (let i = 0; i < balanceColumnCells.length; i++) {
        const balance = await balanceColumnCells[i].getText();
        expect(parseFloat(balance.replace('USD ', '').replace(',', ''))).not.toBe(0, `Balance is displayed as zero for transaction row ${i + 1}`);
      }
    });
  });

  describe('Back Button Functionality', () => {
    beforeEach(async () => {
      // Navigate to the transaction page
      await browser.get('http://10.10.1.135:400/transaction');
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
      await browser.get('http://10.10.1.135:400/dashboard');
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
      await browser.wait(protractor.ExpectedConditions.urlContains('/home'), 5000, 'URL does not contain /login after clicking logout');
      // Assert that the URL is the login page
      expect(await browser.getCurrentUrl()).toContain('/home');
    });
  });
});
