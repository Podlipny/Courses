var express = require('express');
var router = express.Router();
var facebook = require('../services/facebook')('321165144902503', '887ca0d38ee20c97d9741d7c8a7e11a0');
var twitter = require('../services/twitter')('alFUtNzXiiIaL41FfbnpoQgnf', 'iYyhv647geby32AFdiKVLbgLYsLO2bkKmNw33G7oKRf8TuuY5c');

router.use('/', function(req, res, next) {
  if (!req.user) {
    res.redirect('/');
  }
  next();
});

router.use('/', function(req, res, next) {
  if (req.user.twitter) {
    twitter.getUserTimeLine(
      req.user.twitter.token,
      req.user.twitter.tokenSecret, req.user.twitter.id,
      function(results) {
        req.user.twitter.lastPost = results[0].text;
        next();
      });
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  if (req.user.facebook) {
    facebook.getImage(req.user.facebook.token,
      function(results) {
        req.user.facebook.image = results.url;
        facebook.getFriends(req.user.facebook.token,
          function(results) {
            req.user.facebook.friends = results.total_count;
              res.render('users', {
                title: 'Social Aggregator', 
                user: req.user });
          });
      }
    );
  } else {
    res.render('users', {
      title: 'Social Aggregator', 
      // user: {
      //   name: req.user.displayName,
      //   image: req.user.image
      // }
      user: req.user
    });
  }
});

module.exports = router;
