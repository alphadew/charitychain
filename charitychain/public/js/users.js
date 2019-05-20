var express=require('express');
var router=express.Router();
var session = require('express-session');


//get hame page
router.get('/register',function(req,res){
    res.render('register');
});

//login
router.get('/login',function(req,res){
    res.render('login');
});

router.get('/dashboard',function(req,res){
    res.render('admin/dashboard',{layout: 'admin_layout', title: 'Express', user: req.session.email });
});

router.get('/add_user',function(req,res){
    res.render('admin/add_user',{ title: 'Express', user: req.session.email});
});

router.get('/check_vote',function(req,res){
    res.render('admin/check_vote',{layout: 'admin_layout'});
});

router.get('/register_voter',function(req,res){
    res.render('admin/register_voter',{layout: 'admin_layout'});
});

router.get('/view_voter',function(req,res){
    res.render('admin/view_voter',{layout: 'admin_layout'});
});

router.get('/send_money',function(req,res){
    res.render('admin/send_money',{layout: 'admin_layout',title: 'Express', user: req.session.email});
});

router.get('/verify_transaction',function(req,res){
    res.render('admin/verify_transaction',{layout: 'admin_layout',title: 'Express', user: req.session.email});
});

router.get('/request_money',function(req,res){
    res.render('admin/request_money',{layout: 'admin_layout',title: 'Express', user: req.session.email});
});

router.get('/view_request',function(req,res){
    res.render('admin/view_request',{layout: 'admin_layout',title: 'Express', user: req.session.email});
});

router.get('/balance',function(req,res){
    res.render('admin/balance',{layout: 'admin_layout',title: 'Express', user: req.session.email});
});

//voter voting machine
router.get('/voter_voting',function(req,res){
    res.render('voter/voter_machine',{title: 'Express', user: req.session.email});
});

//publish result
router.get('/publish_result',function(req,res){
    res.render('admin/publish_result',{layout: 'admin_layout',title: 'Express', user: req.session.email});
});

router.get('/session',function(req,res){
return req.session.email;
});





module.exports=router;