var express = require('express');
var router = express.Router();
var request = require("request");


router.post('/formData', function(req, res, next) {
    var userData = {
        Firstname : req.body.Name.First,
        Lastname : req.body.Name.Last,
        OrganisationMemberId : Math.floor(Math.random()*90000) + 10000,
        CellPhone1 : req.body.MobilePhone,
        EndDate : getNextYearDate(),
        StartDate : getTodayDate()
    };
    console.log(getNextYearDate());
  var options = { method: 'POST',
  url: 'https://api.cardskipper.se/Import/Member',
  headers: 
   { 'Postman-Token': 'a1729a25-7f9e-4883-845f-e2704b73ea6a',
     'cache-control': 'no-cache',
     Authorization: 'Basic ZG9ubmllQHJnYWkubmV0OmRvbm5pZTU1NQ==',
     'Content-Type': 'application/xml' },
     body: '<Cardskipper>\r\n<Members>\r\n<Member Birthdate="2009-04-21" Firstname="'+userData.Firstname+'" Lastname="'+userData.Lastname+'" OrganisationMemberId="'+userData.OrganisationMemberId+'">\r\n<ContactInfo CellPhone1="'+userData.CellPhone1+'"/>\r\n<Organisations>\r\n<Organisation ClearTags="false" Id="2">\r\n<Roles>\r\n<Role Id="3126" EndDate="'+EndDate+'" StartDate="'+userData.StartDate+'"/>\r\n</Roles>\r\n</Organisation>\r\n</Organisations>\r\n</Member>\r\n</Members>\r\n</Cardskipper>' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(response.statusCode);
  res.json('it is working now.');
});
  
});

function getTodayDate(){
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
return today;
}


function getNextYearDate(){
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+1;

today = yyyy + '-' + mm + '-' + dd;
return today;
}


  

module.exports = router;