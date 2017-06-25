var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = 'mongodb://USER:PSWD@ds119810.mlab.com:19810/database-for-blog';

router.use(bodyParser.json());

router.get('/', function (req, res) {
  res.send('API homepage');
});

router.get('/comments', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    db.collection('posts').find({}).sort( { id: -1 } ).toArray(function(err, items) {
      db.close();
      res.send(items);
    });
  });
});

router.post('/comments', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    var col = db.collection('postCount');
    var dbCount = 0;
    col.find({}).toArray(function(err, items) {
      dbCount = items[0].count;

      db.collection('posts').insertOne({ name: req.body.name, title: req.body.title, comment: req.body.comment, id: dbCount, time: Date(), replies: [] }, function(err, r) {
        assert.equal(null, err);
        assert.equal(1, r.insertedCount);

        col.updateOne({key: "my-key"}, {$set: {count: dbCount + 1}}, function(err, r) {
          assert.equal(null, err);
        });

        db.close();
      });
    });
  });
});

router.get('/comments/:commentid', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    
    db.collection('posts').find({}).filter({id: parseInt(req.params.commentid, 10)}).toArray(function (err, items) {
      db.close();
      res.json(items[0]);
    });
  });
});

router.post('/comments/:commentid', function (req, res) {

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    var replyID = 0;
    db.collection('posts').find({}).filter({id: parseInt(req.params.commentid,10)}).toArray(function(err,items) {
      replyID = items[0].replies.length;

      db.collection('posts').update(
        { id: parseInt(req.params.commentid,10) },
        { $push: { replies: { name: req.body.name, reply: req.body.reply, id: replyID, time: Date() } } }
      );

      db.close();
    });
  });

});

module.exports = router;
