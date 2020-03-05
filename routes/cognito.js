var express = require('express');
var router = express.Router();
var fs = require('fs');
var req = require("request");
var unirest = require("unirest");
var http = require("https");
var request = require("request");
/* GET home page. */
router.get('/', function(req, res, next) {
  var firstName = "test New Imran";

  var options = { method: 'POST',
  url: 'https://api.cardskipper.se/Import/Member',
  headers: 
   { 'Postman-Token': 'a1729a25-7f9e-4883-845f-e2704b73ea6a',
     'cache-control': 'no-cache',
     Authorization: 'Basic ZG9ubmllQHJnYWkubmV0OmRvbm5pZTU1NQ==',
     'Content-Type': 'application/xml' },
  body: '<Cardskipper>\r\n<Members>\r\n<Member Birthdate="2009-04-21" Firstname="'+firstName+'" Lastname="Schelin" OrganisationMemberId="1604">\r\n<ContactInfo CellPhone1="0706051780"/>\r\n<Organisations>\r\n<Organisation ClearTags="false" Id="2">\r\n<Roles>\r\n<Role Id="3126" EndDate="2015-05-15" StartDate="2019-05-16"/>\r\n</Roles>\r\n</Organisation>\r\n</Organisations>\r\n</Member>\r\n</Members>\r\n</Cardskipper>' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  res.json('it is working now.');
});

});
router.get('/test', function(req, res, next) {
  console.log('in card skipper test method');
  var options = { method: 'POST',
  url: 'https://api.cardskipper.se/Import/Member',
  headers: 
   { 'cache-control': 'no-cache',
     Connection: 'keep-alive',
     'Content-Length': '436',
     'Accept-Encoding': 'gzip, deflate',
     Host: 'api.cardskipper.se',
     'Postman-Token': 'de5c2228-35a2-450d-b8d8-a657238119db,5efd293e-58fe-49ea-b0c9-8138c9314f85',
     'Cache-Control': 'no-cache',
     Accept: '*/*',
     'User-Agent': 'PostmanRuntime/7.19.0',
     Authorization: 'Basic ZG9ubmllQHJnYWkubmV0OmRvbm5pZTU1NQ==',
     'Content-Type': 'application/xml' },
  body: '<Cardskipper>\r\n<Members>\r\n\r\n<!-- Minimal Working Example (All required fields)-->\r\n<Member Birthdate="2009-04-21" Firstname="Wilmer" Lastname="Schelin" OrganisationMemberId="150002">\r\n<ContactInfo CellPhone1="0706051780"/>\r\n<Organisations>\r\n<Organisation ClearTags="false" Id="1">\r\n<Roles>\r\n<Role Id="3126" EndDate="2015-05-15" StartDate="2019-05-16"/>\r\n</Roles>\r\n</Organisation>\r\n</Organisations>\r\n</Member>\r\n</Members>\r\n</Cardskipper>' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(error);
  console.log(response);
 

  console.log(body);
  res.json("test return successfully.");
});

});

router.get('/getNumber',function(req,res){
  let number = GetSixdigitMemberShipNumber();
  fs.readFile('demofile1.txt', 'utf8', function(err, contents) {
    console.log(contents);
    var numberArray = contents.split(',');
    let find = checkNumberExist(numberArray,number);
    if(find){
      for(let i = 0; i< 100; i++){
        let newNumber = GetSixdigitMemberShipNumber();
        let newNumberExist = checkNumberExist(numberArray,newNumber);
        if(newNumberExist)
          continue;
        else{
          number = newNumber;
          break;
        }
      }
    }
    else{
      contents += ","+number;
    }
    fs.writeFile('demofile1.txt', contents, function (err) {
      res.json(contents);
    });
  });
 
});

router.get('/testnewnumber', function(req, res, next) {

  GetSixdigitMemberShipNumber(function(number){
    console.log(number);
    res.json('test new ',number); 
  });

  
});

function checkNumberExist(age,number) {
  return age == number;
}

function GetSixdigitMemberShipNumber(callback){
  let number = Math.floor(100000 + Math.random() * 900000);
  fs.readFile('demofile1.txt', 'utf8', function(err, contents) {
    var numberArray = contents.split(',');
    let find = checkNumberExist(numberArray,number);
    if(find){
      for(let i = 0; i< 100; i++){
        let newNumber = Math.floor(100000 + Math.random() * 900000);
        let newNumberExist = checkNumberExist(numberArray,newNumber);
        if(newNumberExist)
          continue;
        else{
          number = newNumber;
          break;
        }
      }
    }
    else{
      contents += ","+number;
    }
    fs.writeFile('demofile1.txt', contents, function (err) {
      console.log('In write file')
      return contents;
    });
  });
}

router.post('/formData', function(req, res, next) {
  res.json('test new form data.');
  let number = Math.floor(100000 + Math.random() * 900000);
  fs.readFile('demofile1.txt', 'utf8', function(err, contents) {
    console.log('contents');
    var numberArray = contents.split(',');
    let find = checkNumberExist(numberArray,number);
    if(find){
      for(let i = 0; i< 100; i++){
        let newNumber = Math.floor(100000 + Math.random() * 900000);
        let newNumberExist = checkNumberExist(numberArray,newNumber);
        if(newNumberExist)
          continue;
        else{
          number = newNumber;
          break;
        }
      }
    }
    else{
      contents += ","+number;
    }
    fs.writeFile('demofile1.txt', contents, function (err) {
      console.log('in write file');
      let memberShipNumber = number;
      let startDate = getTodayDate();
      let endDate = getNextYearDate();
      let birthDate = getBirthDate(req.body.BirthDate);
      var userData = {
        Firstname : req.body.Name.First,
        Lastname : req.body.Name.Last,
        OrganisationMemberId : memberShipNumber,
        CellPhone1 : req.body.MobilePhone,
        EndDate : endDate,
        StartDate : startDate,
        Birthdate: birthDate,
        fullAddress : req.body.Address.StreetAddress,
        city : req.body.Address.City,
        zipCode:req.body.Address.PostalCode,
        OrderId:req.body.Order.Id,
        Extra2:req.body.MyOrder.InvitationCode,
        MobilePhone: req.body.MobilePhone,
        userEmail:req.body.Order.EmailAddress
    };
    if(userData.Extra2 == null && userData.Extra2 == "")
      userData.Extra2 = "NO CODE";
      console.log(userData);
     
      var options = { method: 'POST',
      url: 'https://api.cardskipper.se/Import/Member',
      headers: 
       { 'Postman-Token': 'a1729a25-7f9e-4883-845f-e2704b73ea6a',
         'cache-control': 'no-cache',
         Authorization: 'Basic ZG9ubmllQHJnYWkubmV0OmRvbm5pZTU1NQ==',
         'Content-Type': 'application/xml' },
         body:  '<Cardskipper>\r\n<Members>\r\n<Member Inactive="false"  Birthdate="'+userData.Birthdate+'" Firstname="'+userData.Firstname+'" Lastname="'+userData.Lastname+'" OrganisationMemberId="'+userData.OrganisationMemberId+'">\r\n<Extra Extra3="  " Extra2="'+userData.Extra2+'" Extra1=" "/>\r\n<Address City="'+userData.city+'" Zip="'+userData.zipCode+'" Line2="Test" Line1="'+userData.fullAddress+'"/>\r\n<ContactInfo EMail="'+userData.userEmail+'" CellPhone2="'+userData.MobilePhone+'"/>\r\n<Organisations>\r\n\r\n<Organisation ClearTags="false" Id="2">\r\n<Roles>\r\n<Role Id="3126" EndDate="'+userData.EndDate+'" StartDate="'+userData.StartDate+'"/>\r\n</Roles>\r\n</Organisation>\r\n</Organisations>\r\n</Member>\r\n</Members>\r\n</Cardskipper>' };
         //'<Cardskipper>\r\n<Members>\r\n<Member Birthdate="'+userData.Birthdate+'" Firstname="'+userData.Firstname+'" Lastname="'+userData.Lastname+'" OrganisationMemberId="'+userData.OrganisationMemberId+'">\r\n<ContactInfo CellPhone1="'+userData.CellPhone1+'"/>\r\n<Organisations>\r\n<Organisation ClearTags="false" Id="2">\r\n<Roles>\r\n<Role Id="3126" EndDate="'+userData.EndDate+'" StartDate="'+userData.StartDate+'"/>\r\n</Roles>\r\n</Organisation>\r\n</Organisations>\r\n</Member>\r\n</Members>\r\n</Cardskipper>' };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log('api card skipper data.');
        console.log(response.statusCode);
        res.json(response.statusCode);
      });
    });
  });

  });

  function senCardSkipper(carData){
    var options = { method: 'POST',
    url: 'https://api.cardskipper.se/Import/Member',
    headers: 
     { 'cache-control': 'no-cache',
       Connection: 'keep-alive',
       'Content-Length': '440',
       'Accept-Encoding': 'gzip, deflate',
       Host: 'api.cardskipper.se',
       'Postman-Token': '3da75a3b-2ba2-4767-8d31-be8425174e64,fbd569c5-f537-4b9a-a4e9-b6ea7d381e68',
       'Cache-Control': 'no-cache',
       Accept: '*/*',
       'User-Agent': 'PostmanRuntime/7.19.0',
       Authorization: 'Basic ZG9ubmllQHJnYWkubmV0OmRvbm5pZTU1NQ==',
       'Content-Type': 'application/xml' },
    body: '<Cardskipper>\r\n<Members>\r\n\r\n<!-- Minimal Working Example (All required fields)-->\r\n<Member Birthdate="2009-04-21" Firstname="New Wilmer1" Lastname="Schelin" OrganisationMemberId="150002">\r\n<ContactInfo CellPhone1="0706051780"/>\r\n<Organisations>\r\n<Organisation ClearTags="false" Id="1">\r\n<Roles>\r\n<Role Id="3126" EndDate="2015-05-15" StartDate="2019-05-16"/>\r\n</Roles>\r\n</Organisation>\r\n</Organisations>\r\n</Member>\r\n</Members>\r\n</Cardskipper>' };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  });




    
  }

module.exports = router;
