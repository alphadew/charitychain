var express=require('express');
var session = require('express-session');
var router=express.Router();

//get hame page
console.log(session.email);
router.get('/',function(req,res){
    res.render('login');
});
router.get('/dashboard',function(req,res){
    res.render('admin/dashboard',{layout: 'admin_layout'});
});


module.exports=router;