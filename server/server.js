const express = require('express'),
http = require('http'),
helmet=require('helmet'),
path=require('path'),
bodyParser=require('body-parser'),
CokieParser=require('cookie-parser'),
passport=require('passport'),
cors = require("cors"),
morgan=require('morgan'),
cookieSession=require('cookie-session'),
app = express(),
port = 3001;


const server = http.createServer(app);

const config=require('./config/config');
if (config.NODE_ENV== 'test') {
  app.use(morgan('tiny'));
}else{
  app.unlock(morgan('combined'));
}

app.use(cors());

// use
app.use('/public',express.static(path.join(__dirname,'/../build/static')));
app.use('/static',express.static(path.join(__dirname,'/../build/static')));
app.use('/assets',express.static(path.join(__dirname,'/../src/assets')));
app.use('/uploads',express.static(path.join(__dirname,'/../uploads')));

app.set('views', path.join(__dirname,'/../src'));
app.set('view engine', 'js');
app.engine('js', require('express-react-views').createEngine());
app.use(helmet());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(CokieParser('cookie-parser-sccoashdias213'));




var expiryDate = 1000*60*60*24 // 24 hour
// var expiryDate = 1000*60*2 // 2 minutes



var sessionMiddleware=cookieSession({
  name: 'session',
  keys: ['1029309asdyhsd08yas-phdansdhig081y32ehpidns'],
  cookie: {
    secure: true,
    httpOnly: true,
    expires: expiryDate,
    overwrite:true,
    secureProxy: true
  }
})
app.use(sessionMiddleware);
app.use(function (req, res, next) {
  req.sessionOptions.maxAge = expiryDate
  next()
})


app.use(passport.initialize());
app.use(passport.session());



// require('./db/models/Models'); // use this for initiating models and default datas.
require('./config/passport/passport');
require('./config/passport/strategy');

require('./config/cron/cron');



const checkToken = (req, res, next) => {
  const jwtVerify=require('./config/JwtVerifyFuncton').jwtVerify;
  jwtVerify(req,res)
  .then((user)=>{
    res.token2=user;
    next();
  }).catch((err)=>{
    res.status(403).json(err);
  })
}


app.get('/logout', (req, res, next) => {  
  req.logout();  
  req.session = null;
  res.clearCookie("session")
  res.clearCookie("session.sig")
  res.redirect('/?logout=success');
});



app.get('/api/login',(req,res,next)=>{
  if(req.isAuthenticated()){
    if(req.query.type=='ax'){
      res.status(200).json({
        "code": "AUT_01",
        "message": "Logged In Already",
      });
    }else{
      res.redirect('/?information=You are already logged in!');
    }
  }else{
    res.status(200).json({
      "code": "USR_01",
      "message": "User Not Logged In",
    });
  }
});



// api

    // user
    app.put('/api/user',checkToken,require('./api/user/Update/UpdateUser'));
    app.get('/api/user',checkToken,require('./api/user/GetUserByID'));
    app.post('/api/user',require('./api/user/RegisterUser'));
    app.get('/api/user/login/facebook',passport.authenticate('facebook',{session:false}));
    app.get('/api/user/login/facebook/callback',require('./api/user/Login/LoginFacebook'));
    app.post('/api/user/login',require('./api/user/Login/LoginLocal'));


    // shop




app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/../build/index.html'));
});

server.listen(port, () => console.log(`Example app listening on port ${port}!`));


module.exports = app;