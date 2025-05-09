const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Item = require('./model');

app.use(express.json());

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@mongo-service:27017/admin`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.post('/items', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.send(item);
});

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

app.listen(3000, () => console.log('Server started on port 3000'));
