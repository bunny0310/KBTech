const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  mobile: {type: Number, required: true, unique: true},
  pwd: {type: String, required: true},
  type: {type: String, required: true}
});
module.exports = mongoose.model('User_test', userSchema);
