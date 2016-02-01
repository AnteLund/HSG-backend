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
      console.log(req.body);
      student.lastName = req.body.lastName;
      student.email = req.body.email;
      student.exam = req.body.exam;
      student.yearOfGraduation = req.body.yearOfGraduation;
      student.cityOfInterest= req.body.cityOfInterest;
      res.json({ message: 'Student created!', name:student.firstName});
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
      }];
    res.send(capCities)
  });

router.route('/cities')

	.get(function(req,res){
		res.send([{cityName:"malmö"}]);
	})
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on port: ' + port);
