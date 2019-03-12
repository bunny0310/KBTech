const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  category: {type: String, required: true},
  locations: {type: Array, required: true}
});
module.exports = mongoose.model('Product', userSchema);
