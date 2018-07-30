var mongoose = require('mongoose');

var userSchema = require('../schemas/S_address.js');

module.exports = mongoose.model('address',userSchema);