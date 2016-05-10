var express = require('express');
var router = express.Router();
var validator = require('validator');

var isValidUserInput = function(inputStr) {
  if( inputStr === '' ) { return false; }
  var re = /[\[\]\(\)<>&\;#$%^&*\"]/; // Should match .match(/xxx/) on client side
  var invalidCharsArray = inputStr.match(re);
  if( invalidCharsArray===null ) { return true; }

  return false;
}


/* 
 * USER DB ACTIONS - GET, POST, DELETE
 */

router.get('/userlist', function(req, res) {
  console.log("USERS.js: /userlist requested...");
  var db = req.db;
  var collection = db.get('userlist');
  collection.find({}, {}, function(e, docs){
    res.json(docs);
  });
});




router.post('/adduser', function(req, res) {
  console.log("USERS.js: /adduser requested...");

  // VALIDATE FIELDS
  console.log("req.body = ", req.body); // req.body === AJAX Post Msg Body
  console.log( "ALL INPUTS VALID?  " + isValidUserInput(req.body.firstname) + " " + 
      isValidUserInput(req.body.lastname) + " " + 
      isValidUserInput(req.body.jobtitle) + " " + 
      isValidUserInput(req.body.email) + " " + 
      isValidUserInput(req.body.company) + " " + 
      isValidUserInput(req.body.country) );

  var validationErrMsg;

  // RETURN ON INVALIDATE USER INPUT
  if( !isValidUserInput(req.body.firstname) ||
      !isValidUserInput(req.body.lastname) ||
      !isValidUserInput(req.body.jobtitle) ||
      !isValidUserInput(req.body.email) ||
      !isValidUserInput(req.body.company) ||
      !isValidUserInput(req.body.country) ) { 

    validationErrMsg = 'Validation-Failed';
    console.log("ERROR:  New user rejected by server.");
    res.send(
      { msg: validationErrMsg }
    );
    return;
  }

  if( !validator.isEmail(req.body.email) ) {
    validationErrMsg = "Enter a valid email, please.";
    res.send(
      { msg: validationErrMsg }
    );
    return;
  }


  var sanitizedUserInput = {
    firstname: validator.escape( req.body.firstname ),
    lastname:  validator.escape( req.body.lastname ),
    jobtitle:  validator.escape( req.body.jobtitle ),
    email:     validator.escape( req.body.email ),
    company:   validator.escape( req.body.company ),
    country:   validator.escape( req.body.country ),
  };

  var db = req.db;
  var collection = db.get('userlist');
  collection.insert(sanitizedUserInput, function(err, result) {
    if (err) {
      // The db INSERT failed, return error
      res.send({ msg: "There was a problem adding the information to the database." } );
      console.log( "SURVEY DATABASE ERROR:  " + err);
    } 
    else {
      // Success, next page...
      res.send({ msg: "" });
    }
  });
});




router.delete('/deleteuser/:id', function(req, res) {
  console.log("USERS.js: /deleteuser/:id requested...");
  var db = req.db;
  var collection = db.get('userlist');
  var userToDelete = req.params.id;
  console.log('DELETING USER ' + userToDelete);

  collection.remove({ '_id': userToDelete }, function(err) {
    res.send( (err===null) ? { msg: '' } : { msg:'error: ' + err });
  });

});


module.exports = router;
