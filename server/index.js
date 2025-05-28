const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const clientCtrl  = require('./controller/qsclientcontroller');
const productCtrl = require('./controller/qsproductcontroller');
const stockCtrl   = require('./controller/qsstockcontroller');
const orderCtrl   = require('./controller/ordercontroller'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/QueueSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.post('/api/clients/login', clientCtrl.loginClient);
app.post('/api/clients/register', clientCtrl.registerClient);
app.get('/api/clients/all', clientCtrl.getAllClients);

app.route('/api/products')
   .get(productCtrl.getAllProducts)
   .post(productCtrl.createProduct);

app.route('/api/products/:id')
   .put(productCtrl.updateProduct)
   .delete(productCtrl.deleteProduct);

app.route('/api/stocks')
   .get(stockCtrl.getAllStocks)
   .post(stockCtrl.createStock);

app.route('/api/stocks/:id')
   .put(stockCtrl.updateStock)
   .delete(stockCtrl.deleteStock);

app.route('/api/orders')
   .get(orderCtrl.getOrders)     
   .post(orderCtrl.addOrder);   

app.route('/api/orders/:id')
   .put(orderCtrl.updateOrder)
   .delete(orderCtrl.deleteOrder);
   app.put('/api/orders/:id/accept', orderCtrl.acceptOrder);
   app.get('/api/orders/delivered', orderCtrl.getDeliveredOrders);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
