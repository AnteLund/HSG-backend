var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Student = require('./models/student')
var mongoose   = require('mongoose');
var Student    = require('./models/student');
var cors       = require('cors');
//mongoose.connect('mongodb://localhost:27017/student');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
var port = process.env.PORT || 8080;

var router = express.Router();

router.route('/student')
    // add new student
    .post(function(req, res){
      var student = new Student();
      student.firstName = req.body.firstName;
      student.lastName = req.body.lastName;
      student.email = req.body.email;
      student.exam = req.body.exam;
      student.yearOfGraduation = req.body.yearOfGraduation;
      student.cityOfInterest = req.body.cityOfInterest;
      student.creationDate = new Date();
      console.log(student);
      res.json({ message: 'Student created!', fullStudent:student});
    });
router.route('/cities')
  .get(function(req,res){
    var capCities = [
      {
        cityName : 'Malmö'
      },
      {
        cityName : 'Stockholm'
      },
      {
        cityName : 'Göteborg'
      },
      {
        cityName : 'Boden'
      }];
    res.send(capCities)
  });

router.route('/roles')

	.get(function(req,res){
    var workRoles = [
      {
        roleName:'Project manager'
      },
      {
        roleName:'Software developer'
      },
      {
        roleName: 'Business analyst'
      }
    ]
		res.send(workRoles);
	})
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on port: ' + port);
