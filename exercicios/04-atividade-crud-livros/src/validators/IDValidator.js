const mongoose = require('mongoose');


module.exports = function validateId(req, res, next) {
const { id } = req.params;
if (!mongoose.Types.ObjectId.isValid(id)) {
return res.status(400).json({ errors: ['ID inválido'] });
}
next();
};