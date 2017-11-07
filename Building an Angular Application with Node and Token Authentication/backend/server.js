var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var jwt = require('jwt-simple');

var User = require('./models/User.js');
var Post = require('./models/Post.js');
var auth = require('./auth.js');

mongoose.Promise = Promise; //mPromise od Mongoose je depricated, proto rikame ze chceme pouzit ES6 Promise

//po
app.use(cors());
app.use(bodyParser.json());

app.get('/posts/:id', async (req, res) => {
    var author = req.params.id;
    var posts = await Post.find({ author });
    res.send(posts);
});

app.post('/post', auth.checkAuthenticated, (req, res) => {
    var postData = req.body;
    postData.author = req.userId; //bere se z auth.checkAuthenticated kde se nastavi req.userId z payload ktery se dopocita z tokenu

    var post = new Post(postData);

    post.save((err, result) => {
        if (err) {
            console.error('saving post error');
            return res.status(500).send({ message: 'saving post error' });
        }

        res.sendStatus(200);
    });
});

app.get('/users', async (req, res) => {
    try {
        var users = await User.find({}, '-pwd -__v'); //timto odebereme property, ktere nechceme
        res.send(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/profile/:id', async (req, res) => {
    try {
        var user = await User.findById(req.params.id, '-pwd -__v');
        res.send(user);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

mongoose.connect('mongodb://test:test@ds133311.mlab.com:33311/pssocial', { useMongoClient: true }, (err) => {
    if (!err)
        console.log('connected to mongo');
});

app.use('/auth', auth.router);
app.listen(process.env.PORT || 3000);