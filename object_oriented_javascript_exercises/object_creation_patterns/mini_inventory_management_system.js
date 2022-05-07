const ItemCreator = (function() {
  function generateSKUCode(itemName, category) {
    let firstPart = itemName.replace(/\s/g, '').slice(0, 3).toUpperCase();
    let secondPart = category.replace(/\s/g, '').slice(0, 2).toUpperCase();
    return firstPart + secondPart;          
  }
  
  function isValidItemName(itemName) {
    return itemName.replace(/\s/g, '').length >= 5;
  }
  
  function isValidCategory(category) {
    return category.split(' ').length === 1 && category.replace(/\s/g, '').length >= 5;
  }
  
  function isValidQuantity(quantity) {
    return quantity !== undefined;
  }
  
  return function(itemName, category, quantity) {
    if (isValidItemName(itemName) && isValidCategory(category) && isValidQuantity(quantity)) {
      this.SKUCode = generateSKUCode(itemName, category);
      this.itemName = itemName;
      this.category = category;
      this.quantity = quantity;
    } else {
      return { notValid: true };
    }
  };
})();

const ItemManager = {
  items: [],
  
  getItem(SKUCode) {
    return this.items.filter(item => item.SKUCode === SKUCode)[0];
  },
  
  create(itemName, category, quantity) {
    let item = new ItemCreator(itemName, category, quantity);
    if (item.notValid) {
      return false;
    } else {
      this.items.push(item);
    }
  },
  
  update(SKUCode, itemInfo) {
    Object.assign(this.getItem(SKUCode), itemInfo);
  },
  
  delete(SKUCode) {
    let item = this.getItem(SKUCode);
    this.items.splice(this.items.indexOf(item), 1);
  },
  
  inStock() {
    return this.items.filter(({quantity}) => quantity > 0);
  },
  
  itemsInCategory(category) {
    return this.items.filter(item => item.category === category);
  },
};

const ReportManager = {
  init(itemManager) {
    this.items = itemManager;
  },
  
  createReporter(SKUCode) {
    let item = this.items.getItem(SKUCode);

    return {
      itemInfo() {
        Object.keys(item).forEach(key => console.log(`${key}: ${item[key]}`));
      },
    };
  },
  
  reportInStock() {
    console.log(this.items.inStock().map(({itemName}) => itemName).join(','));
  },
};

ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item

console.log(ItemManager.items);
// returns list with the 4 valid items

ReportManager.init(ItemManager);
ReportManager.reportInStock();
// logs soccer ball,football,kitchen pot

ItemManager.update('SOCSP', { quantity: 0 });
console.log(ItemManager.inStock());
// returns list with the item objects for football and kitchen pot
ReportManager.reportInStock();
// logs football,kitchen pot
console.log(ItemManager.itemsInCategory('sports'));
// returns list with the item objects for basket ball, soccer ball, and football
ItemManager.delete('SOCSP');
console.log(ItemManager.items);
// returns list with the remaining 3 valid items (soccer ball is removed from the list)

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10
