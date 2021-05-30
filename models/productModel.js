const db = require("../util/database");

module.exports = class Product {
  constructor(
    id,
    productname,
    cost,
    saleprice,
    retailprice,
    inventory,
    manufacturing,
    backordered,
    primaryimage,
    catalogimage
  ) {
    this.productId = id;
    this.productName = productname;
    this.productCost = cost;
    this.productSalePrice = saleprice;
    this.productRetailsPrice = retailprice;
    this.productInventory = inventory;
    this.productManufacturing = manufacturing;
    this.productBackordered = backordered;
    this.productPrimaryImage = primaryimage;
    this.productCatalogImage = catalogimage;
  }

  save() {
    return db.execute(
      "INSERT INTO products(productId, productName, productCost, productSalePrice, productRetailsPrice, productInventory, productManufacturing, productBackordered,productPrimaryImage) VALUES(?,?,?,?,?,?,?,?,?)",
      [
        this.productId,
        this.productName,
        this.productCost,
        this.productSalePrice,
        this.productRetailsPrice,
        this.productInventory,
        this.productManufacturing,
        this.productBackordered,
        this.productPrimaryImage,
      ]
    );
  }

  saveCatalogImages(i) {
    return db.execute(
      "INSERT INTO product_catalog_images(productId, productCatalogImage) VALUES(?,?)",
      [this.productId, this.productCatalogImage[i]]
    );
  }

  static findAll() {
    return db.execute(
      "SELECT p.*, GROUP_CONCAT(productCatalogImage SEPARATOR '***') AS productCatalogImage FROM products p INNER JOIN product_catalog_images pc ON p.productId=pc.productId GROUP By p.productId"
    );
  }

  static deleteProduct(id) {
    return db.execute("DELETE FROM products WHERE productId=?", [id]);
  }

  static findProductById(id) {
    return db.execute(
      "SELECT p.*, GROUP_CONCAT(productCatalogImage SEPARATOR '***') AS productCatalogImage FROM products p INNER JOIN product_catalog_images pc ON p.productId=pc.productId GROUP By p.productId HAVING p.productId=?",
      [id]
    );
  }

  static searchProducts(searchText) {
    return db.execute(
      "SELECT p.*, GROUP_CONCAT(productCatalogImage SEPARATOR '***') AS productCatalogImage FROM products p INNER JOIN product_catalog_images pc ON p.productId=pc.productId  AND (p.productName LIKE '%" +
        searchText +
        "%') GROUP By p.productId"
    );
  }
};
