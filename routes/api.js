var express = require('express');
var app = require('./express')
var User = require('../models/user.js');
var router = express.Router();
var Candidate = require('../models/Candidates.js');

// setup body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// register a user
app.post('/api/users/register', function (req, res) {
    // find or create the user with the given username
    User.findOrCreate({username: req.body.username}, function(err, user, created) {
        if (created) {
            // if this username is not taken, then create a user record
            user.race = req.body.race;
            user.state = req.body.state;
            user.sex = req.body.sex;
            user.state = req.body.state;
            user.set_password(req.body.password);
            user.save(function(err) {
		if (err) {
		    res.sendStatus("403");
		    return;
		}
                // create a token
		var token = User.generateToken(user.username);
                // return value is JSON containing the user's name and token
                res.json({name: user.name, token: token});
            });
        } else {
            // return an error if the username is taken
            res.sendStatus("403");
        }
    });
});

// login a user
app.post('/api/users/login', function (req, res) {
    // find the user with the given username
    User.findOne({username: req.body.username}, function(err,user) {
	if (err) {
	    res.sendStatus(403);
	    return;
	}
        // validate the user exists and the password is correct
        if (user && user.checkPassword(req.body.password)) {
            // create a token
            var token = User.generateToken(user.username);
            // return value is JSON containing user's name and token
            res.json({name: user.name, token: token});
        } else {
            res.sendStatus(403);
        }
    });
});

//update statement
app.put('/api/items/:statment_id', function (req,res) {
  // validate the supplied token
      // if the token is valid, then find the requested item
      Statement.findById(req.params.statement_id, function(err,item) {
    if (err) {
      res.sendStatus(403);
      return;
    }
        item.title = req.body.item.title;
        item.completed = req.body.item.completed;
        item.save(function(err) {
      if (err) {
        res.sendStatus(403);
        return;
      }
          // return value is the item as JSON
          res.json({item:item});
        });
      });
  });

//get candidates
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

module.exports = router;
