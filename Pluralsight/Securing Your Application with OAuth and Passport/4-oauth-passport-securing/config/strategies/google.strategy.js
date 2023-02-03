var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/userModel');

module.exports = function() {
    passport.use(new GoogleStrategy({
            clientID: '37737627537-asm3u728premvsbhb4nk8qc66ve8rn5b.apps.googleusercontent.com',
            clientSecret: 'fe0aa14V3B9qTXXpA20Zboxz',
            callbackURL: 'http://localhost:3000/auth/google/callback'
        },
        function(req, accessToken, refreshToken, profile, done) {
            // var user = {};
            //pokud user existuje a ma id twitteru nebo fcebooku, tak k nemu pridame google
            if (req.user) {
                var query = {};
                if (req.user.twitter) {
                    console.log('twitter');
                    var query = { 'twitter.id': req.user.twitter.id };
                } else if (req.user.facebook) {
                    console.log('facebook');
                    var query = { 'facebook.id': req.user.facebook.id };
                }
                User.findOne(query, function(error, user) {
                    if (user) {
                        user.google = {};
                        user.google.id = profile.id;
                        user.google.token = accessToken;

                        user.save();
                        console.log('updated');
                        done(null, user);
                    }
                });
            } else {
                //najdeme usera podle googleId
                var query = {
                    'google.id': profile.id
                };
                User.findOne(query, function(error, user) {
                    if (user) {
                        //pokud ho najde, tak ho vrati
                        console.log('found');
                        done(null, user);
                    } else {
                        //pokud ne, tak ho ulozi do DB
                        console.log('not found');
                        var user = new User;
                        user.email = profile.emails[0].value;
                        user.image = profile._json.image.url;
                        user.displayName = profile.displayName;

                        user.google = {};
                        user.google.id = profile.id;
                        user.google.token = accessToken;

                        user.save();
                        console.log('created');
                        done(null, user);
                    }
                });
            }
        }
    ));
};