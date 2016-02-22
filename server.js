var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Student = require('./models/student')
var City = require('./models/city')
var cors       = require('cors');
mongoose.connect('mongodb://ec2-52-30-62-85.eu-west-1.compute.amazonaws.com:27017/student');
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
      student.cityOfInterest = req.body.cityOfInterest;
      student.roleOfInterest = req.body.roleOfInterest;
      student.creationDate = new Date();
      student.save(function(err){
        if(err){
          return console.error(err);
        }
        console.log("Student created")
      })
      res.json({ message: 'Student created!', student: student});
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

  router.route('/students/:student_id/comments')
    .post(function(req, res){
      var newComment = {
        commentText : req.body.commentText,
        authur : req.body.authur,
        creationDate : new Date()
      }

      console.log(newComment);
      Student.findByIdAndUpdate(req.params.student_id, {$push: {comments: newComment}},{'new':true}, function(err, comment){
        if(!comment) return console.error("Could not load student");
        res.json(comment);
      })
    });
router.route('/students/:student_id/comments/:comment_id')
  .delete(function(req,res){
    Student.update({_id: req.params.student_id},{$pull:{"comments":{_id: req.params.comment_id}}}, function(err, comment){
      res.json(comment);
    });
  })
router.route('/cities')
  .get(function(req,res){
    City.find(function(err,cities){
      if(err) return console.error(err);
      res.json(cities);
    });
  })
  .post(function(req,res){
    var city = new City();
    city.cityName = req.body.cityName;
    city.creationDate = new Date();
    city.active = true;
    city.save(function(err){
      if(err){
        return console.error(err);
      }
      res.json("City Added");
    })

  })
router.route('/roles')

	.get(function(req,res){
    var workRoles = [
      {
        roleName:'Business manager'
      },
      {
        roleName:':Java Developer'
      },
      {
        roleName: 'Business analyst'
      },
      {
        roleName: '.NET Developer'
      },
      {
        roleName: 'Front-end developer/UX designer'
      },
      {
        roleName: 'Application Specialist'
      }
    ]
		res.send(workRoles);
	})
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on port: ' + port);
