var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    email: String,
    pwd: String,
    name: String,
    description: String
});

//Pre save event - volame pred volanim save function - dojde k zasifrovani hesla
userSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('pwd'))
        return next();

    //pokud je salt null, tak se generuje automaticky
    bcrypt.hash(user.pwd, null, null, (err, hash) => {
        if(err) return next(err);

        user.pwd = hash;
        next();
    });
});

module.exports = mongoose.model('User', userSchema);
