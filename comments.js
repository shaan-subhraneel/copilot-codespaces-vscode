// Create web server
const express = require('express');
const app = express();
// import module
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// connect to mongodb
mongoose.connect('mongodb://localhost/learn');
// create schema
var commentSchema = new mongoose.Schema({
  name: String,
  comment: String
});
// create model
var Comment = mongoose.model('Comment', commentSchema);
// set view engine
app.set('view engine', 'ejs');
// set middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
// routing
app.get('/', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) throw err;
    res.render('index', {comments: comments});
  });
});
app.post('/post', (req, res) => {
  var newComment = new Comment({
    name: req.body.name,
    comment: req.body.comment
  });
  newComment.save((err) => {
    if (err) throw err;
    res.redirect('/');
  });
});
// listen port
app.listen(3000);
console.log('server on');