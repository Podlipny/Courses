var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function () {
    passport.use(new FacebookStrategy({
            clientID: '703186593144235',
            clientSecret: '08c0e83ab9529e9a44160e772a628121',
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
            passReqToCallback: true
        },
        function (req, accessToken, refreshToken, profile, done) {

            var user = {};

            user.email = profile.emails[0].value;
            //user.image = profile._json.image.url;
            user.displayName = profile.displayName;

            user.facebook = {};
            user.facebook.id = profile.id;
            user.facebook.token = accessToken;

            done(null, user);
        }));

}