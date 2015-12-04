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
      console.log(statements);
      res.sendStatus('403');
      return;
    }
    res.send(statements);
  });
});

router.post('/pollresults', function(req, res) {
    for (statement in req) {
        Statement.find({statement.statement}, function(err, statementFromDB) {
            if (err) {
              console.log(statements);
              res.sendStatus('403');
              return;
            }
            //update the database with the stuff
            
        })
    }
})

module.exports = router;
