var express = require('express');
var router = express.Router();
var Candidate = require('../models/Candidates.js');
var Statement = require('../models/Statements.js');

router.get('/candidates', function(req, res) {
  Candidate.find({}, function(err, candidates) {
    if (err) {
      res.sendStatus('403');
      return;
    }
    res.send(candidates);
  });
});

router.get('/candidates/:id', function(req, res) {

});


router.get('/statements', function(req, res) {
  Statement.find({}, function(err, statements) {
    if (err) {
      res.sendStatus('403');
      return;
    }
    res.send(statements);
  });
});

module.exports = router;
