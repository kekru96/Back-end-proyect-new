const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  const productsData = fs.readFileSync('productos.json');
  const products = JSON.parse(productsData);

  const limit = req.query.limit || products.length;
  const limitedProducts = products.slice(0, limit);

  res.json(limitedProducts);
});

router.get('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const productsData = fs.readFileSync('productos.json');
  const products = JSON.parse(productsData);

  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

router.post('/', (req, res) => {
  const newProduct = req.body;
  const productsData = fs.readFileSync('productos.json');
  const products = JSON.parse(productsData);

  const newId = generateProductId(products);
  newProduct.id = newId;
  products.push(newProduct);

  fs.writeFileSync('productos.json', JSON.stringify(products));

  res.json(newProduct);
});

router.put('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const updatedProduct = req.body;
  const productsData = fs.readFileSync('productos.json');
  const products = JSON.parse(productsData);

  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    updatedProduct.id = productId;
    products[productIndex] = updatedProduct;
    fs.writeFileSync('productos.json', JSON.stringify(products));
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

router.delete('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const productsData = fs.readFileSync('productos.json');
  const products = JSON.parse(productsData);

  const updatedProducts = products.filter((p) => p.id !== productId);

  if (products.length !== updatedProducts.length) {
    fs.writeFileSync('productos.json', JSON.stringify(updatedProducts));
    res.json({ message: 'Producto eliminado' });
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

function generateProductId(products) {
  const productIds = products.map((p) => p.id);
  const maxId = Math.max(...productIds);
  return maxId + 1;
}

module.exports = router;
