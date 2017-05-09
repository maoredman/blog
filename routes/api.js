var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');

var comments = [];

// middleware that is specific to this router
router.use(bodyParser.json());

/*
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
*/

// define the home page route
router.get('/', function (req, res) {
  res.send('API homepage');
});
// define the about route
router.get('/comments', function (req, res) {
  res.send(comments);
});
router.post('/comments', function (req, res) {
  comments.push({ name: req.body.name, comment: req.body.comment, id: comments.length, time: Date() });
  res.redirect(200, '/'); // redirect is run from top level index.js
});

module.exports = router;