import { Locator, Page, expect } from '@playwright/test';
import { Helper } from '../Helper/helper';
import { config } from 'dotenv';

config();

export class SaucedemoPage extends Helper {
  // Locators
  private UserNameInput: Locator;
  private Password: Locator;
  private Login: Locator;
  private InventoryItem: Locator;
  private CartBadge: Locator;
  private InventoryItem2: Locator;
  private InventoryButton: Locator;
  private ShopingCartLink: Locator;
  private CartItem: Locator;
  private FirstItem: Locator;
  private RemoveFirstItem: Locator;
  private CheckoutButton: Locator;
  private FirstName: Locator;
  private LastName: Locator;
  private PostalCode: Locator;
  private Continue: Locator;
  private Finish: Locator;
  private SuccessMessage: Locator;
  private BurgerMenu: Locator;
  private LogoutSidebar: Locator;
  private Logo: Locator;



  

  constructor(page: Page) {
    super(page); // Pass the page instance to the Helper class
    this.UserNameInput = this.page.locator('#user-name'); 
    this.Password = this.page.locator('#password'); 
    this.Login = this.page.locator('#login-button'); 
    this.InventoryItem=this.page.locator('.inventory_item:nth-child(1) .btn_inventory');
    this.CartBadge=this.page.locator('.shopping_cart_badge');
    this.InventoryItem2=this.page.locator('.inventory_item:nth-child(2) .inventory_item_name');
    this.InventoryButton=this.page.locator('.btn_inventory');
    this.ShopingCartLink=this.page.locator('.shopping_cart_link');
    this.CartItem=this.page.locator('.cart_item');
    this.FirstItem=this.page.locator('.cart_item:nth-child(1) .cart_button');
    this.CheckoutButton=this.page.locator('.checkout_button');
    this.RemoveFirstItem=this.page.locator('#remove-sauce-labs-backpack');
    this.FirstName=this.page.locator('#first-name');
    this.LastName=this.page.locator('#last-name');
    this.PostalCode=this.page.locator('#postal-code');
    this.Continue=this.page.locator('#continue');
    this.Finish=this.page.locator('#finish');
    this.SuccessMessage=this.page.locator('.complete-header');
    this.BurgerMenu=this.page.locator('#react-burger-menu-btn');
    this.LogoutSidebar=this.page.locator('#logout_sidebar_link');
    this.Logo=this.page.locator('.login_logo');
  }

  async navigateToHomePage(): Promise<void> {
    const url = process.env.URL;
    if (!url) {
        throw new Error('Environment variable "URL" is not defined');
      }
      await this.page.goto(url);
  }
  
  async FillUsername(): Promise<void> {
    await this.UserNameInput.fill('standard_user');
  }
  async FillPassword(): Promise<void> {
   
    await this.Password.fill('secret_sauce');
  }

  async ClickLogin(): Promise<void> {
    await this.Login.click();
    
  }

  async AddfirstItem(): Promise<void> {
    await this.InventoryItem.click();
    
  }
  async VerifyCartBadge(){

  const cartBadge = await this.CartBadge;
  await expect(cartBadge).toHaveText('1');

}
async OpenanotherInventory(): Promise<void> {
  await this.InventoryItem2.click();
  await this.InventoryButton.click();
  
}

async OpencartandVerify(): Promise<void> {
  await this.ShopingCartLink.click();
  const cartItems = await this.CartItem;
  await expect(cartItems).toHaveCount(2);
  
}

async RemoveFirst(): Promise<void> {
  await this.RemoveFirstItem.click();
  
}

async Verifyonlyoneitem(): Promise<void> {

  const cartItems = await this.CartItem;
  await expect(cartItems).toHaveCount(1);
  
}
async Checkout(): Promise<void> {
  await this.CheckoutButton.click();
  
}

async CompletecheckoutForm(): Promise<void> {
   
  await this.FirstName.fill('Test');
 await this.LastName.fill('User');
  await this.PostalCode.fill('12345');
  await this.Continue.click();

}

async FinishAction(): Promise<void> {
  await this.Finish.click();
  
}

async VerifyOrderCompletition(){

  const successMessage = await this.SuccessMessage;
  await expect(successMessage).toHaveText('THANK YOU FOR YOUR ORDER');

}



async VerifySortingAZ(): Promise<void> {
  await this.page.selectOption('.product_sort_container', { value: 'az' });
  const itemNamesAZ = await this.page.locator('.inventory_item_name').allTextContents();
  const sortedAZ = [...itemNamesAZ].sort();
  expect(itemNamesAZ).toEqual(sortedAZ);
}

async ChangeSortingZA(): Promise<void> {
  await this.page.selectOption('.product_sort_container', { value: 'za' });
  const itemNamesZA = await this.page.locator('.inventory_item_name').allTextContents();
  const sortedZA = [...itemNamesZA];
  expect(itemNamesZA).toEqual(sortedZA);
}

async ChangeSortingToPriceLowtoHigh(): Promise<void> {
  await this.page.selectOption('.product_sort_container', { value: 'lohi' });
  const itemPricesLowToHigh = await this.page.locator('.inventory_item_price').allTextContents();
  expect(itemPricesLowToHigh).toEqual(itemPricesLowToHigh.sort((a, b) => parseFloat(a) - parseFloat(b)));
}

async ChangeSortingToPriceHightoLow(): Promise<void> {
  await this.page.selectOption('.product_sort_container', { value: 'hilo' });
  const itemPricesHighToLow = await this.page.locator('.inventory_item_price').allTextContents();
  expect(itemPricesHighToLow).toEqual(itemPricesHighToLow.sort((a, b) => parseFloat(b) - parseFloat(a)));
}

async FillIncorectUsername(): Promise<void> {
  await this.UserNameInput.fill('standard');
}
async FillIncorectPassword(): Promise<void> {
 
  await this.Password.fill('secret_sauce1');
}
async VerifyLoginFails(): Promise<void> {
const errorMessage = await this.page.locator('.error-message-container');
  await expect(errorMessage).toContainText('Username and password do not match any user in this service');
}
async Menu(): Promise<void> {
  await this.BurgerMenu.click();
  
}
async LogOut(): Promise<void> {
  await this.LogoutSidebar.click();
  
}
async VerifyLoginPage(): Promise<void> {
  await expect(this.page).toHaveURL('https://www.saucedemo.com/');
  await expect(this.page.locator('.login_logo')).toBeVisible();
}

}
