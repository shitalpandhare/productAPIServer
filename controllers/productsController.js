const Product = require("../models/productModel");

exports.storeProduct = async (req, res) => {
  (productId = req.body.productId),
    (productName = req.body.productName),
    (productCost = req.body.productCost),
    (productSalePrice = req.body.productSalePrice),
    (productRetailsPrice = req.body.productRetailsPrice),
    (productInventory = req.body.productInventory),
    (productManufacturing = req.body.productManufacturing),
    (productBackordered = req.body.productBackordered);
  productPrimaryImage = req.body.productPrimaryImage;
  productCatalogImage = req.body.productCatalogImage;

  const product = new Product(
    productId,
    productName,
    productCost,
    productSalePrice,
    productRetailsPrice,
    productInventory,
    productManufacturing,
    productBackordered,
    productPrimaryImage,
    productCatalogImage
  );

  //   console.log(user);

  product
    .save()
    .then((result) => {
      if (result[0].affectedRows == 1) {
        //
        return Promise;
      } else {
        res.status(400).json({
          status: "failed",
          code: 400,
          responseMsg: "product is not store in DB",
        });
      }
    })
    .then(async (result) => {
      let resul;
      let i = 0;
      for (i = 0; i < productCatalogImage.length; i++) {
        resul = await product.saveCatalogImages(i);
      }

      if (resul[0].affectedRows == 1) {
        res.status(201).json({
          status: "success",
          code: 201,
          responseMsg: "product store  Successfully",
        });
      } else {
        res.status(400).json({
          status: "failed",
          code: 400,
          responseMsg: "product is not store in DB",
        });
      }
    });
};

exports.getAllProducts = async (req, res) => {
  let products;
  try {
    products = await Product.findAll();
    if (products[0].length == 0) {
      res.status(404).json({
        message: "products are not found",
      });
    } else {
      res.status(200).json({
        message: "product fetched successfully",
        products: products[0],
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getProductById = async (req, res) => {
  id = req.params.id;
  const product = await Product.findProductById(id);
  try {
    if (product[0].length == 0) {
      res.status(404).json({
        message: "product is not found with id :" + id,
      });
    } else {
      res.status(200).json({
        message: "product fetched successfully",
        product: product[0][0],
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteProduct = async (req, res) => {
  id = req.params.id;
  const product = await Product.findProductById(id);

  if (product[0].length == 0) {
    return res.status(404).json({
      success: false,
      message: "Product is not found with id :" + id,
    });
  }
  const data = await Product.deleteProduct(id);
  try {
    if (data[0].affectedRows == 0) {
      return res.status(401).json({
        success: false,
        message: "error occure while product  deleting !",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product Deteled  successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.searchProducts = async (req, res) => {
  const searchText = req.params.searchText;
  console.log("in search");
  try {
    const products = await Product.searchProducts(searchText);
    if (products[0].length == 0) {
      res.status(204).json({
        message: "user is not found with searchText :" + searchText,
      });
    } else {
      res.status(200).json({
        message: "user fetched successfully",
        product: products[0],
      });
    }
  } catch (err) {
    res.status(204).json({
      message: "error occure while searching",
    });
  }
};
