let express = require('express');
let app = express();
const {c, cpp, node, python, java} = require('compile-run');
var randomstring = require("randomstring");
let server = require('http').Server(app)
let io = require('socket.io')(server)
let ms = require('mysql');
let fs = require('fs');
const multer = require('multer');
var bodyParser = require("body-parser");
const sqlite3 = require('sqlite3').verbose(); 
let db = new sqlite3.Database('./db/yo.db');
var download = require('download-file')
var formidable = require('formidable');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs')
app.use(express.static('./public'))
const upload = multer({
dest: __dirname+'uploads/'
}); 
///// start page /////////////////////////////////////////////////////////////
app.get('/',(req,res)=>{
  res.render('index',{
              start:"start"
              })
})
///// check key //////////////////////////////////////////////////////////////
io.on('connection', (socket)=>{
  app.post('/check',function(req,res){
    var kit=req.body.key;
    //console.log(kit);
    var query = `SELECT * FROM web WHERE key ='"+kit+"'`;
    db.all(query, function (err, result){  //
      var count=result.length
      if(count==1){
        //console.log('aviable');
        var href="web"
        var dezz="aviable";
        io.sockets.emit('avi',{avi:dezz,href:href,key:kit})
      }
      else{//
        var query = "SELECT * FROM python WHERE key ='"+kit+"'";
        db.all(query, function (err, result){//
          var count=result.length;
          if(count==1){
            //console.log('aviable');
            var href="python"
            var dezz="aviable";
            io.sockets.emit('avi',{avi:dezz,href:href,key:kit})
          }
        else{//
          var query = "SELECT * FROM java WHERE key ='"+kit+"'";
          db.all(query, function (err, result){//
          var count=result.length;
          if(count==1){
            //console.log('aviable');
            var href="java"
            var dezz="aviable";
            io.sockets.emit('avi',{avi:dezz,href:href,key:kit})
          }
        
          else{
            //console.log('not aviable');
            var dez="notaviable";
            io.sockets.emit('avi',{avi:dez,key:kit})
          }
          })
        }
      })
      }
    })
  })
})
///// python join ////////////////////////////////////////////////////////////
app.get('/python',(req,res)=>{
  if(req.query.key && req.query.user){
    let key= req.query.key;
    var query = "SELECT code FROM python WHERE key ='"+key+"'";
    var code = null;
    db.all(query, function (err, rows) {
      code = rows[0].code;
      res.render('python',{
        key : req.query.key,
        textpython:code,
        username:req.query.user
      })         
    })
  }
})
io.on('connection',(socket)=>{
  let key = socket.handshake.query.room
  if(key){
    socket.join(key)
  }
  socket.on('python',(res)=>{
    var se=res.char
    
    let sqlU = "UPDATE python SET code = '"+se+"' WHERE key = '"+key+"'"
    db.all(sqlU, function (err, rows) {
      var query = "SELECT * FROM python WHERE key ='"+key+"'";
      db.all(query, function (err, rows) {
        io.to(key).emit('text',{cods:rows[0].code})
      })
    })    
  })
})
app.post('/join',function(req,res){
  res.render('join',{
    v:req.body.usernames,
    key:req.body.key,
    href:req.body.href
  })
})
//////add room/////
app.post('/add',function(req,res){
  var ket=randomstring.generate({
  length:11 ,
  charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghhijklmnopqrstuvwxyz1234567890'
  });
  //console.log(ket);
  var url=req.body.ur
  if(url=="web"){
    let vy = "INSERT into web(html,css,js,key)values('','','','"+ket+"')"
    db.all(vy, function (err, rows) {
      if(err){
        throw err;
      }
    })
    var query = "SELECT key FROM web WHERE key ='"+ket+"'";
    db.all(query, function (err, rows) {
      if(err){
        //console.log(err);
      }
    let kluch =rows[0].key;
      res.render('add',{
                username:req.body.nameadmin,
                key:kluch,
                href:url
              })
  })
  }
  if(url=="python"){
    let vy = "INSERT into python(code,key)values('','"+ket+"')"
    db.all(vy, function (err, rows) {
      if(err){
        throw err;
      }
    })
    var query = "SELECT key FROM python WHERE key ='"+ket+"'";
    db.all(query, function (err, rows) {
      if(err){
        //console.log(err);
      }
      let kluch =rows[0].key;
        res.render('add',{
                username:req.body.nameadmin,
                key:kluch,
                href:url
              })
    
  })
    
  }
  if(url=="java"){
    let vy = "INSERT into java(code,key)values('',"+ket+"')"
    db.all(vy, function (err, rows) {
      if(err){
        throw err;
      }
    })
    var query = "SELECT key FROM java WHERE key ='"+ket+"'";
    db.all(query, function (err, rows) {
      if(err){
        //console.log(err);
      }
    let kluch =rows[0].key;
      res.render('add',{
                username:req.body.nameadmin,
                key:kluch,
                href:url
              })
  })
}

})
io.on('connection', (socket)=>{
  socket.on('runpy',(data)=>{
  var qwer=data.run
  var query = "SELECT code FROM python WHERE key ='"+qwer+"'";
  db.all(query, function (err, rows) {
    var code=rows[0].code;
    //console.log(code)
  let resultPromise = python.runSource(``+code+``);
  resultPromise
      .then(result => {
          var ress=result.stdout;
          //console.log(ress)
          if(ress==""){
            //console.log('error')
            io.sockets.emit('compilepy',{run:"error",key:qwer})
          }
          else{
          io.sockets.emit('compilepy',{run:ress,key:qwer})
        }
      })
      .catch(err => {
        //console.log("err");
          //console.log(err);
      });
    })       
       })
    socket.on('iam',(data)=>{
      //console.log('d')
      var yourkey=data.mykey
      var yourname=data.myname
      io.sockets.emit('yokey',{yourname:yourname,yourkey:yourkey})
})
    ///file download///
  socket.on('pydown',(ke)=>{
    var ke=ke.ke
    var query = "SELECT code FROM python WHERE key ='"+ke+"'";
    db.all(query, function (err, rows) {
    var code=rows[0].code;
    fs.writeFile(__dirname+'/together.py', code, function (err) {
    if (err) throw err;
    io.sockets.emit('dowmpy',{do:ke})
    app.get('/downloadpy',function(req,res){
      res.download(__dirname+'/together.py','together.py')
})
    });
    });
  })
    socket.on('closeterminal',(data)=>{
      io.sockets.emit('closs',{yourkey:data.key})
    })
})
app.post('/fileupload', upload.single('file-to-upload'), (req,res)=>
{
console.log("r")
  })
server.listen(3000,()=>{console.log('Start')})
