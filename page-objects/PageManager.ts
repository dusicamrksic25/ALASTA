import { Page } from '@playwright/test';
import { SaucedemoPage } from './Saucedemo';

export class PageManager {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Getter for the eBay Search Page
  get SearchPage(): SaucedemoPage {
    return new SaucedemoPage(this.page);
  }
}
