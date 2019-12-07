var express = require('express');
var router = express.Router();
var request = require("request");

router.get('/', function(req, res, next) {
res.json('it is working now.');
  
  });

  router.post('/testData', function(req, res, next) {
    let memberShipNumber = getMemberShipNumber();
    let startDate = getTodayDate();
    let endDate = getNextYearDate();
    
    var userData = {
      Firstname : req.body.Name.First,
      Lastname : req.body.Name.Last,
      OrganisationMemberId : memberShipNumber,
      CellPhone1 : req.body.MobilePhone,
      EndDate : endDate,
      StartDate : startDate,
      Birthdate: req.body.BirthDate,
      fullAddress : req.body.Address.FullAddress,
      city : req.body.Address.City,
      zipCode:req.body.Address.PostalCode,
      OrderId:req.body.Order.Id,
      userEmail:req.body.Order.EmailAddress
  };
  console.log(userData);
  res.json("test data");

});



router.post('/formData', function(req, res, next) {
  let memberShipNumber = getMemberShipNumber();
  let startDate = getTodayDate();
  let endDate = getNextYearDate();
  
  var userData = {
    Firstname : req.body.Name.First,
    Lastname : req.body.Name.Last,
    OrganisationMemberId : memberShipNumber,
    CellPhone1 : req.body.MobilePhone,
    EndDate : endDate,
    StartDate : startDate,
    Birthdate: req.body.BirthDate,
    fullAddress : req.body.Address.FullAddress,
    city : req.body.Address.City,
    zipCode:req.body.Address.PostalCode,
    OrderId:req.body.Order.Id,
    userEmail:req.body.Order.EmailAddress
};

  //   console.log(userData);
  //    var myJSON = JSON.stringify(req.body);
  // fs.writeFile('demofile1.txt', myJSON, function (err) {

  // });
  // fs.writeFile('demofileData.txt', userData, function (err) {
  
  // });
    //res.json('it is working.');
 
  var options = { method: 'POST',
  url: 'https://api.cardskipper.se/Import/Member',
  headers: 
   { 'Postman-Token': 'a1729a25-7f9e-4883-845f-e2704b73ea6a',
     'cache-control': 'no-cache',
     Authorization: 'Basic ZG9ubmllQHJnYWkubmV0OmRvbm5pZTU1NQ==',
     'Content-Type': 'application/xml' },
     body:  '<Cardskipper>\r\n<Members>\r\n<Member Inactive="false"  Birthdate="'+userData.Birthdate+'" Firstname="'+userData.Firstname+'" Lastname="'+userData.Lastname+'" OrganisationMemberId="'+userData.OrganisationMemberId+'">\r\n\r\n<Address City="'+userData.city+'" Zip="'+userData.zipCode+'" Line2="Test" Line1="'+userData.fullAddress+'"/>\r\n<ContactInfo EMail="'+userData.userEmail+'"/>\r\n<Organisations>\r\n\r\n<Organisation ClearTags="false" Id="2">\r\n<Roles>\r\n<Role Id="3126" EndDate="'+userData.EndDate+'" StartDate="'+userData.StartDate+'"/>\r\n</Roles>\r\n</Organisation>\r\n</Organisations>\r\n</Member>\r\n</Members>\r\n</Cardskipper>' };
     //'<Cardskipper>\r\n<Members>\r\n<Member Birthdate="'+userData.Birthdate+'" Firstname="'+userData.Firstname+'" Lastname="'+userData.Lastname+'" OrganisationMemberId="'+userData.OrganisationMemberId+'">\r\n<ContactInfo CellPhone1="'+userData.CellPhone1+'"/>\r\n<Organisations>\r\n<Organisation ClearTags="false" Id="2">\r\n<Roles>\r\n<Role Id="3126" EndDate="'+userData.EndDate+'" StartDate="'+userData.StartDate+'"/>\r\n</Roles>\r\n</Organisation>\r\n</Organisations>\r\n</Member>\r\n</Members>\r\n</Cardskipper>' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(response.statusCode);
  res.json(response.statusCode);
});
  
});

function getMemberShipNumber(){
  let date_ob = new Date();
  let year = date_ob.getFullYear();
  let month = date_ob.getMonth();
  let day = date_ob.getDay();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  let milliseconds = date_ob.getMilliseconds();
  return year+""+month+""+day+""+hours+""+minutes+""+seconds+""+milliseconds;
}

function getNextYearDate(){
  var date_ob = new Date();
  return (date_ob.getFullYear()+1) + '-' + date_ob.getMonth() + '-' + date_ob.getDay();
}

function getTodayDate(){
  var date_ob = new Date();
  let year = date_ob.getFullYear();
  let month = date_ob.getMonth();
  let day = date_ob.getDay();
  return year + '-' + month + '-' + day;
}


  

module.exports = router;