var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/userModel');

module.exports = function() {
    passport.use(new TwitterStrategy({
        consumerKey: 'alFUtNzXiiIaL41FfbnpoQgnf',
        consumerSecret: 'iYyhv647geby32AFdiKVLbgLYsLO2bkKmNw33G7oKRf8TuuY5c',
        callbackURL: 'http://localhost:3000/auth/twitter/callback',
        passReqToCallback: true
    }, function (req, token, tokenSecret, profile, done) {
            // var user = {};
            if (req.user) {
                var query = {};
                if (req.user.google) {
                    console.log('google');
                    var query = { 'google.id': req.user.google.id };
                } else if (req.user.facebook) {
                    console.log('facebook');
                    var query = { 'facebook.id': req.user.facebook.id };
                }
                User.findOne(query, function(error, user) {
                    if (user) {
                        user.twitter = {};
                        user.twitter.id = profile.id;
                        user.twitter.token = token;
                        user.twitter.tokenSecret = tokenSecret;

                        user.save();
                        console.log('updated');
                        done(null, user);
                    }
                });
            } else {
                var query = {
                    'twitter.id': profile.id
                };
                User.findOne(query, function(error, user) {
                    if (user) {
                        console.log('found');
                        done(null, user);
                    } else {
                        console.log('not found');
                        var user = new User;
                        //user.email = ''; // Not provided by Twitter
                        user.image = profile._json.profile_image_url;
                        user.displayName = profile.displayName;

                        user.twitter = {};
                        user.twitter.id = profile.id;
                        user.twitter.token = token;
                        user.twitter.tokenSecret = tokenSecret;

                        user.save();
                        console.log('created');
                        done(null, user);
                    }
                });
            }
    }));
};