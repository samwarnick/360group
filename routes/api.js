var express = require('express');
var router = express.Router();
var Candidate = require('../models/Candidates.js');

router.get('/candidates/party/:party', function(req, res) {
  Candidate.find({party: req.params.party}, {name: 1, party: 1}, function(err, candidates) {
    if (err) {
      res.sendStatus('403');
      return;
    }
    res.send(candidates);
  });
});

router.get('/candidates/id/:id', function(req, res) {
  console.log('getting candidate');
  Candidate.findById(req.params.id, function(err, candidate) {
    if (err) {
      res.sendStatus('403');
      return;
    }
    res.send(candidate);
  });
});

module.exports = router;
