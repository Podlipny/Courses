var OAuth = require('OAuth').OAuth2;

var Facebook = function(facebookKey, facebookSecret) {
    var key = facebookKey;
    var secret = facebookSecret;

    var oauth = new OAuth(
        key, secret, 'https://graph.facebook.com',
        null,
        'oauth2/token',
        null
    );

    var getImage = function(userKey, done) {
        oauth.get(
            'https://graph.facebook.com/v2.7/me/picture?redirect=false&type=large',
            userKey,
            function(err, results, res) {
                results = JSON.parse(results);
                done(results.data);
            }
        );
    };

    var getFriends = function(userKey, done) {
        oauth.get(
            'https://graph.facebook.com/v2.7/me/friends?redirect=false',
            userKey,
            function(err, results, res) {
                results = JSON.parse(results);
                done(results.summary);
            }
        );
    };

    return {
        getImage: getImage,
        getFriends: getFriends
    };
}

module.exports = Facebook;