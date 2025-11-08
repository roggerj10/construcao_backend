const mongoose = require('mongoose');


function isObjectId(value) {
return mongoose.Types.ObjectId.isValid(String(value));
}


module.exports = { isObjectId };