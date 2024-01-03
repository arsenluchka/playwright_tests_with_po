const { BaseSwagLabPage } = require("./BaseSwagLab.page");

export class InventoryPage extends BaseSwagLabPage {
  url = "/inventory.html";

  get headerTitle() {
    return this.page.locator(".title");
  } //

  get inventoryItems() {
    return this.page.locator(".inventory_item");
  }

  get addItemToCartBtns() {
    return this.page.locator('[id^="add-to-cart"]');
  }

  get sortContainer() {
    return this.page.locator('[data-test="product_sort_container"]');
  }

  get productElementName() {
    return this.page.locator(".inventory_item_name ");
  }

  get productPrice() {
    return this.page.locator(".inventory_item_price");
  }

  get productDescription() { return this.page.locator('.inventory_item_desc')}


getNameByIndex(i) {
    return this.productElementName.nth(i).textContent();
};

getDescriptionByIndex(i) {
    return this.productDescription.nth(i).textContent();
};

getPricebyIndex(i) {
    return this.productPrice.nth(i).textContent();
};

async getProductsInformation() {
    const numberOfProduct = await this.inventoryItems.count()
    const productsInfo = [];

    for (let i = 0; i < numberOfProduct; i += 1) {
        productsInfo.push({
            name: await this.getNameByIndex(i),
            description: await this.getDescriptionByIndex(i),
            price: await this.getPricebyIndex(i),
        });
    }
    return productsInfo;
}
async addItemToCartByInventoryItem(index){
    await this.page.locator(`//*[@class="inventory_item"][${index}]//*/button`).click()
}
  async selectPriceNumber (elem){
    return elem.map((el) =>  Number(el.substr(1))  )
}

  async addItemToCartById(id) {
    await this.addItemToCartBtns.nth(id).click();
  }
}

