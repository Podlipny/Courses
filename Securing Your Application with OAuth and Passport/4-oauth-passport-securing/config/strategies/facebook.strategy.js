var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var User = require('../../models/userModel');

module.exports = function() {
    passport.use(new FacebookStrategy({
        clientID: '321165144902503',
        clientSecret: '887ca0d38ee20c97d9741d7c8a7e11a0',
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        passReqToCallback: true
    }, function (req, accessToken, refreshToken, profile, done) {
            if (req.user) {
                var query = {};
                if (req.user.twitter) {
                    console.log('twitter');
                    var query = { 'twitter.id': req.user.twitter.id };
                } else if (req.user.google) {
                    console.log('google');
                    var query = { 'google.id': req.user.google.id };
                }
                User.findOne(query, function(error, user) {
                    if (user) {
                        user.facebook = {};
                        user.facebook.id = profile.id;
                        user.facebook.token = accessToken;

                        user.save();
                        console.log('updated');
                        done(null, user);
                    }
                });
            } else {
                var query = {
                    'facebook.id': profile.id
                };
                User.findOne(query, function(error, user) {
                    if (user) {
                        console.log('found');
                        done(null, user);
                    } else {
                        console.log('not found');
                        var user = new User;
                        user.email = profile.email;
                        // user.image = profile._json.profile_image_url; // Not provided directly by Facebook 
                        user.displayName = profile.displayName;

                        user.facebook = {};
                        user.facebook.id = profile.id;
                        user.facebook.token = accessToken;

                        user.save();
                        console.log('created');
                        done(null, user);
                    }
                });
            }
    }));
};