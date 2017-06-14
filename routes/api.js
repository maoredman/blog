var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');

var comments = [];

router.use(bodyParser.json());

router.get('/', function (req, res) {
  res.send('API homepage');
});

router.get('/comments', function (req, res) {
  res.send(comments);
});
router.post('/comments', function (req, res) {
  comments.push({ name: req.body.name, title: req.body.title, comment: req.body.comment, id: comments.length, time: Date(), replies: [] });
});

router.get('/comments/:commentid', function (req, res) {
  res.send(comments[req.params.commentid]); // :commentid requested by react click will always be valid, as comments are not deleted
});

router.post('/comments/:commentid', function (req, res) {
  comments[req.params.commentid].replies.push({ name: req.body.name, reply: req.body.reply, id: comments[req.params.commentid].replies.length, time: Date() });
});

module.exports = router;