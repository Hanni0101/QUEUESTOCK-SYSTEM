const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const QueueController = require('./controller/queuecontroller');
const ClientController = require('./controller/clientcontroller');
const ProductController = require('./controller/qsproductcontroller');
const OrderController = require('./controller/ordercontroller');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/QueueSystem', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get('/api/queues', QueueController.getAllQueues);
app.get('/api/queues/:id', QueueController.getQueueById);
app.post('/api/queues', QueueController.createQueue);
app.put('/api/queues/:id', QueueController.updateQueue);
app.delete('/api/queues/:id', QueueController.deleteQueue);

app.post('/api/clients', ClientController.createClient);
app.get('/api/clients', ClientController.getAllClients);

app.post('/api/products', ProductController.createProduct);
app.get('/api/products', ProductController.getAllProducts);

app.post('/api/orders', OrderController.createOrder);
app.get('/api/orders', OrderController.getAllOrders);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
