var express = require("express")
var app =express();
var morgan = require('morgan')
var bodyParser = require("body-parser")
const connection = require("./config/dbconnection")
var port = 8080;
// var path = require("path")

var authRouter = require('./controllers/auth.route')
var userRouter =require("./controllers/user.route")
// var commentRouter=require("./controllers/comment.route")

app.use(morgan('dev'));
// app.use('/', express.static(path.join(__dirname, 'files')))

app.use(bodyParser.urlencoded({ extended: false }));


app.use("/auth",authRouter);
app.use("/user",userRouter);

app.use(function(req,res, next){
    next({
        msg: 'not found',
        status:400 
    })
})
app.use(function(err, req, res, next) {
    console.log('what comes in >>>', err);
    res.status(err.status || 400);
    res.json({
        message: err.msg || err
    })
});


app.listen(port,function(err,done){
    if(err){
        console.log("server listening failed",err)
    }else{
        console.log("server listning successful")
    }
})