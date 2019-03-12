const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
  products: {type: Array, required: true},
  delivery_person_id: {type: String},
  order_stage: {type: String, required: true},
  user_id: {type: String, required: true},
  pickup_locations: {type: Array},
});
module.exports = mongoose.model('Order', orderSchema);
