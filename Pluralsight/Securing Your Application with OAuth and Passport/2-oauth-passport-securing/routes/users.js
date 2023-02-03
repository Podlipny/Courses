var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('users', {user: {name: req.user.displayName,
                              image: req.user._json.image.url}});
});

module.exports = router;
