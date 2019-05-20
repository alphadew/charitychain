
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyPareser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');

var routes=require('./routes/index');
var users=require('./routes/users');

//init app
var app=express();

//View Engine
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({}));
app.set('view engine','handlebars');

//Bodyparser Middleware
app.use(bodyPareser.json());
app.use(bodyPareser.urlencoded({extended:false}));
app.use(cookieParser());

//set static folder
app.use(express.static(path.join(__dirname,'public')));

//Express session
app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:false
}));

//passpor init
app.use(passport.initialize());
app.use(passport.session());


//Express validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

  //conncet flash
  app.use(flash());

  //global vars
  app.use(function(req,res,next){
      res.locals.success_msg=req.flash('success_mesg');
      res.locals.error_msg=req.flash('error_msg');
      res.locals.error=req.flash('error');
      next();
  });
  
  var sess;

  app.get('/',function(req,res){
    sess = req.session;
    //Session set when user Request our app via URL
    if(sess.email) {
    /*
    * This line check Session existence.
    * If it existed will do some action.
    */
        res.redirect('/admin');
    }
    else {
        res.render('index');
    }
    });

    //admin login
    app.get('/admin',function(req,res){
      sess = req.session;
    if(sess.email) {
    //  res.write('<h1>Hello '+sess.email+'</h1>');
    // res.end('<a href="/logout">Logout</a>');
    res.setHeader('Content-Type','text/html');
    res.redirect('/users/dashboard');

    } else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href="/">Login</a>');
    }
    });

    //voter login
    app.get('/voter',function(req,res){
      sess = req.session;
    if(sess.email) {
    //  res.write('<h1>Hello '+sess.email+'</h1>');
    // res.end('<a href="/logout">Logout</a>');
    res.setHeader('Content-Type','text/html');
    res.redirect('/users/voter_voting');

    } else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href="/">Login</a>');
    }
    });
    app.post('/',function(req,res){
      sess = req.session;
    //In this we are assigning email to sess.email variable.
    //email comes from HTML page.
      sess.email=req.body.email;
      res.end('done');
    });

    app.get('/logout',function(req,res){
      req.session.destroy(function(err) {
        if(err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
      });
    });

    app.get('/session',function(req,res){
     
      res.end(req.session.email);

    })
    app.get('/users/add_user',function(req,res){
     
      res.render('admin/add_user',{layout: 'admin_layout', title: 'Express', user: req.session.email});
    })
  app.get('/users/send_money',function(req,res){
      res.render('admin/send_money',{layout: 'admin_layout',title: 'Express', user: req.session.email});
  });

  app.get('/add_user',function(req,res){
    res.render('admin/add_user',{ title: 'Express'});
});

  //set routes
  app.use('/',routes);
  app.use('/users',users);

  //set port
  app.set('port',(process.env.PORT||3000));

  app.listen(app.get('port'),function(){
      console.log("server started on port"+app.get('port'));
  });

//mail code start
  app.get('/sendmail',function(req,res){
    console.log("hello ammaa");
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'testalphadew@gmail.com',
               pass: 'CharityChain789'
           }
       });

       var accountgrab=req.query.valid;
       var grab2=req.query.mailid;
       console.log(accountgrab);
       console.log(grab2);
   //   // send mail with defined transport object
        const mailOptions = {
   
          from: 'testalphadew@gmail.com', // sender address
          to: grab2, // list of receivers
          subject: 'Registration confirmation mail', // Subject line
          html: '<p>Dear User,<p> This email is being sent to confirm that you have been registered under CharityChain. Your login id is'+accountgrab+'</p>'// plain text body
        };
        transporter.sendMail(mailOptions, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info);
       });
       //mail code end
   // res.render('admin/add_user',{ title: 'Express', user: req.session.email});

        res.redirect('/');
  });

  //verify transaction (Search)
  app.get('/users/verify_transaction',function(req,res){
    res.render('admin/verify_transaction',{layout: 'admin_layout',title: 'Express', user: req.session.email});
});



app.get('/users/request_money',function(req,res){
  res.render('admin/request_money',{layout: 'admin_layout',title: 'Express', user: req.session.email});
});

app.get('/users/view_request',function(req,res){
  res.render('admin/view_request',{layout: 'admin_layout',title: 'Express', user: req.session.email});
});

app.get('/users/balance',function(req,res){
  res.render('admin/balance',{layout: 'admin_layout',title: 'Express', user: req.session.email});
});