import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/PageManager';

test.describe('', () => {
  test('An order can be completed', async ({ page }) => {
    const pageManager = new PageManager(page);
  
  await pageManager.SearchPage.navigateToHomePage();
  await pageManager.SearchPage.FillUsername();
  await pageManager.SearchPage.FillPassword();
  await pageManager.SearchPage.ClickLogin();
  await pageManager.SearchPage.AddfirstItem();
  await pageManager.SearchPage.VerifyCartBadge();
  await pageManager.SearchPage.OpenanotherInventory();
  await pageManager.SearchPage.OpencartandVerify();
  await pageManager.SearchPage.RemoveFirst();
  await pageManager.SearchPage.Verifyonlyoneitem();
  await pageManager.SearchPage.Checkout();
  await pageManager.SearchPage.CompletecheckoutForm();

  await pageManager.SearchPage.FinishAction();


  });
  test('Items can be sorted', async ({ page }) => {
    const pageManager = new PageManager(page);
  
  await pageManager.SearchPage.navigateToHomePage();
  await pageManager.SearchPage.FillUsername();
  await pageManager.SearchPage.FillPassword();
  await pageManager.SearchPage.ClickLogin();
  await pageManager.SearchPage.VerifySortingAZ();
  await pageManager.SearchPage.ChangeSortingZA();
  await pageManager.SearchPage.ChangeSortingToPriceLowtoHigh();
  await pageManager.SearchPage.ChangeSortingToPriceHightoLow();

  });

  test('Cannot login with incorect credentials', async ({ page }) => {
    const pageManager = new PageManager(page);
  
  await pageManager.SearchPage.navigateToHomePage();
  await pageManager.SearchPage.FillIncorectUsername();
  await pageManager.SearchPage.FillIncorectPassword();
  await pageManager.SearchPage.ClickLogin();
  await pageManager.SearchPage.VerifyLoginFails();

  });
  test('Log out', async ({ page }) => {
    const pageManager = new PageManager(page);
  
  await pageManager.SearchPage.navigateToHomePage();
  await pageManager.SearchPage.FillUsername();
  await pageManager.SearchPage.FillPassword();
  await pageManager.SearchPage.ClickLogin();
  await pageManager.SearchPage.Menu();
  await pageManager.SearchPage.LogOut();
  await pageManager.SearchPage.VerifyLoginPage();

  });
});
