import { Page } from '@playwright/test';

export class Helper {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    const baseUrl = process.env.URL;
  }

  // Reusable method to wait for an element to be visible
  async waitForVisibility(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  // Reusable method to scroll to an element
  async scrollToElement(selector: string): Promise<void> {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

}
