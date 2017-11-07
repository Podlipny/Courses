var mongoose = require('mongoose')


module.exports = mongoose.model('Post', {
    msg: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } //referencujeme post s jednim userem
})