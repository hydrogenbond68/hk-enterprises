const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const User = require('./models/User'); // From earlier
const auth = require('./middleware/auth'); // From earlier

// Auth routes from earlier...

// Product routes (CRUD, admin-only)
const Product = mongoose.model('Product', new mongoose.Schema({
  title: String, description: String, price: Number, image: String, category: String, stock: Number, bookable: Boolean
}));

app.post('/products', auth('admin'), async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.send(product);
});

// Payment initiation
app.post('/initiate-payment', auth('customer'), async (req, res) => {
  const { phone, amount } = req.body;
  const shortCode = process.env.BUSINESS_SHORT_CODE; // e.g., your PayBill linked to 0714818100
  const passkey = process.env.MPESA_PASSKEY;
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
  const password = Buffer.from(shortCode + passkey + timestamp).toString('base64');

  try {
    const tokenRes = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      auth: { username: process.env.CONSUMER_KEY, password: process.env.CONSUMER_SECRET }
    });
    const token = tokenRes.data.access_token;

    const stkRes = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: shortCode,
      PhoneNumber: phone,
      CallBackURL: process.env.CALLBACK_URL,
      AccountReference: 'HK Order',
      TransactionDesc: 'Payment for HK products'
    }, { headers: { Authorization: `Bearer ${token}` } });

    res.send(stkRes.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Callback
app.post('/callback', (req, res) => {
  const result = req.body.Body.stkCallback;
  // Update order status in DB based on result.ResultCode (0 for success)
  console.log(result);
  res.sendStatus(200);
});

app.listen(3001, () => console.log('Server running on port 3001'));