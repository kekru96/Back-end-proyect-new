const express = require('express');
const fs = require('fs');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars'); 
const path = require('path');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

const hbs = exphbs.create(); 

app.engine('handlebars', hbs.engine);

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
  const productsData = fs.readFileSync('productos.json');
  const products = JSON.parse(productsData);

  res.render('home', { products });
});

app.get('/realtimeproducts', (req, res) => {
  const productsData = fs.readFileSync('productos.json');
  const products = JSON.parse(productsData);

  res.render('realTimeProducts', { products });
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  const productsData = fs.readFileSync('productos.json');
  const products = JSON.parse(productsData);
  socket.emit('updateProducts', products);

  socket.on('updateProducts', (updatedProducts) => {
    fs.writeFileSync('productos.json', JSON.stringify(updatedProducts));
    io.emit('updateProducts', updatedProducts);
  });

  const cartData = fs.readFileSync('carrito.json');
  const cart = JSON.parse(cartData);
  socket.emit('updateCartProducts', cart.products);

  socket.on('updateCartProducts', (updatedCartProducts) => {
    fs.writeFileSync('carrito.json', JSON.stringify({ id: cart.id, products: updatedCartProducts }));
    io.emit('updateCartProducts', updatedCartProducts);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
