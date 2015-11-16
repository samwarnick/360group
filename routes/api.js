var express = require('express');
var router = express.Router();
var Candidate = require('../models/Candidates.js');

router.get('/candidates', function(req, res) {
  Candidate.find({}, function(err, candidates) {
    if (err) {
      res.sendStatus('403');
      return;
    }
    console.log(candidates);
    res.send(candidates);
  });
});

module.exports = router;
