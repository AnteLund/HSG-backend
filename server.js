var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Student = require('./models/student')
mongoose.connect('mongodb://localhost:27017/student');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.route('/student')
    // add new student
    .post(function(req, res){
      var student = new Student();
      student.firstName = req.body.firstName;
      student.lastName = req.body.lastName;
      student.email = req.body.email;
      res.json({ message: 'Student created!', student:student});
    });


app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on port: ' + port);
