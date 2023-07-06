const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/:cid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const cartData = fs.readFileSync('carrito.json');
  const cart = JSON.parse(cartData);

  if (cart.id === cartId) {
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

router.post('/', (req, res) => {
  const newCart = { id: generateCartId(), products: [] };
  fs.writeFileSync('carrito.json', JSON.stringify(newCart));

  res.json(newCart);
});

router.post('/:cid/products', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const newProduct = req.body;
  const cartData = fs.readFileSync('carrito.json');
  const cart = JSON.parse(cartData);

  if (cart.id === cartId) {
    const updatedProducts = [...cart.products, newProduct];
    fs.writeFileSync('carrito.json', JSON.stringify({ id: cart.id, products: updatedProducts }));

    res.json(newProduct);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

router.delete('/:cid/products/:pid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const cartData = fs.readFileSync('carrito.json');
  const cart = JSON.parse(cartData);

  if (cart.id === cartId) {
    const updatedProducts = cart.products.filter((p) => p.id !== productId);
    fs.writeFileSync('carrito.json', JSON.stringify({ id: cart.id, products: updatedProducts }));

    res.json({ message: 'Producto eliminado del carrito' });
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

function generateCartId() {
  const cartData = fs.readFileSync('carrito.json');
  const cart = JSON.parse(cartData);
  return cart.id + 1;
}

module.exports = router;
