var ItemCreator = (function () {
  function generateSKU(name, category) {
    var result = '';
  
    if (name.split(' ').length > 1 && name.split(' ')[0].length == 2) {
      result += name.split(' ')[0];
      result += name.split(' ')[1][0];
    } else {
      result += name.slice(0, 3);
    }

    return (result + category.slice(0, 2)).toUpperCase();
  }

  function invalidItem(name, category, quantity) {
    if (name.replace(' ', '').length < 5) {
      return true;
    }

    if (category.length < 5 || category.split(' ').length > 1) {
      return true;
    }

    if (typeof quantity !== 'number') {
      return true;
    }

    return false;
  }

  return function(name, category, quantity) {
    this.skuCode = generateSKU(name, category);
    this.name = name;
    this.category = category;
    this.quantity = quantity;

    if (invalidItem(name, category, quantity)) {
      this.notValid = true;
    }
  };
})();

var ItemManager = {
  items: [],

  create: function(name, category, quantity) {
    var item = new ItemCreator(name, category, quantity);
    if (item.notValid) {
      return false;
    } else {
      this.items.push(item);
    }
  },

  getItem: function(skuCode) {
    var index = -1;
    var i;

    for (i = 0; i < this.items.length; i += 1) {
      if (this.items[i].skuCode === skuCode) {
        index = i;
        break;
      }
    }
    
    return index;
  },

  update: function(skuCode, obj) {
    var item = this.items[this.getItem(skuCode)];
    Object.keys(obj).forEach(key => item[key] = obj[key]);
  },

  delete: function(skuCode) {
    this.items.splice(this.getItem(skuCode), 1);
  },

  inStock: function() {
    return this.items.filter(item => item.quantity > 0);
  },

  itemsInCategory: function(category) {
    return this.items.filter(item => item.category === category);
  },
};

ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item

var ReportManager = {
  init: function(itemManager) {
    this.items = itemManager;
  },

  createReporter: function(skuCode) {
    var item = this.items.items.filter(obj => obj.skuCode === skuCode)[0];

    return {
      itemInfo: function() {
        Object.keys(item).forEach(prop => {
          console.log(`${prop}: ${item[prop]}`);
        });
      }
    };
  },

  reportInStock: function() {
    console.log(this.items.inStock().map(item => item.name).join(', '));
  },
};

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
var kitchenPotReporter = ReportManager.createReporter('KITCO');
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
