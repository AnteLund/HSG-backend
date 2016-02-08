var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Student = require('./models/student')
var mongoose   = require('mongoose');
var Student    = require('./models/student');
var cors       = require('cors');
mongoose.connect('mongodb://localhost:27017/student');
var db = mongoose.connection;
mongoose.set('debug, true');
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
  console.log("Connected to DB");
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
var port = process.env.PORT || 8080;

var router = express.Router();

router.route('/students')
    // add new student
    .post(function(req, res){
      var student = new Student();
      student.firstName = req.body.firstName;
      student.lastName = req.body.lastName;
      student.email = req.body.email;
      student.exam = req.body.exam;
      student.yearOfGraduation = req.body.yearOfGraduation;
      studentInsert.cityOfInterest = req.body.cityOfInterest;
      studentInsert.creationDate = new Date();
      studentInsert.save(function(err){
        if(err){
          return console.error(err);
        }
        console.log("Student created")
      })
      res.json({ message: 'Student created!'});
    })
    // Retrive list of students
    .get(function(req,res){
      Student.find(function(err,students){
        if(err) return console.error(err);
        var answer = {length:students.length, searchtime: new Date(), allStudent:students}
        res.json(answer);
      })
    })

  router.route('/students/:student_id')
    .get(function(req,res){
      Student.findById(req.params.student_id,function(err, student){
        if(err) return console.error(err);
        console.log(student);
        res.json(student);
      })
    })
    .put(function(req, res){
      Student.findById(req.params.student_id, function(err, student){
        if(!student) return console.error("Could not load student");
        student.modified = new Date();
        student.firstName = req.body.firstName;
        student.lastName = req.body.lastName;
        student.email = req.body.email;
        student.exam = req.body.exam;
        student.yearOfGraduation = req.body.yearOfGraduation;
        student.cityOfInterest = req.body.cityOfInterest;
      })
    })
    .delete(function(req, res){
      Student.findByIdAndRemove(req.params.student_id, function(err, student){
        if(err) return console.error(err);
        console.log(student);
        res.json(student);
      })
    })
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
