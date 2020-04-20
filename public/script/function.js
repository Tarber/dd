function choose(){
	 document.getElementById("ou").value = "web";
   document.getElementById("web").style.color = "#7E7E7E";
	 document.getElementById("java").style.color = "white";
	 document.getElementById("python").style.color = "white";
	 document.getElementsByTagName("form")[1].setAttribute("action", "/add"); 
   document.getElementById("deh").style.display = "block";
}
function choosepy(){
   document.getElementById("ou").value = "python";
   document.getElementById("python").style.color = "#7E7E7E";
	 document.getElementById("web").style.color = "white";
	 document.getElementById("java").style.color = "white";
	 document.getElementsByTagName("form")[1].setAttribute("action", "/add"); 
	 document.getElementById("deh").style.display = "block";
}
function choosejava(){
    document.getElementById("ou").value = "java";
	  document.getElementById("java").style.color = "#7E7E7E";
    document.getElementById("python").style.color = "white";
    document.getElementById("web").style.color = "white";
    document.getElementsByTagName("form")[1].setAttribute("action", "/add"); 
    document.getElementById("deh").style.display = "block";
}
function got(){
	key=document.getElementById('username').value;
  	$(document).ready(function(){
      if(key.includes(`'`)==false){
  		  $.post(mms+'check',{key:key})
      }
      else{
        $('[data-toggle="noto"]').tooltip({
          trigger:'manual',
          animation:true
        });   
        $('#username').tooltip('show')
      }
  	})
}
function co(){
  $('#username').removeAttr('title');
  $('#username').tooltip('hide')
	var maxLength =11;
  	var value = document.getElementById('username').value;
   	if (value.length == maxLength){
   		got();
	}
    else{
     	document.getElementById('setik').style.display = 'none';
     	document.getElementById('usernames').style.display = 'none';
    } 
}
function coo(){
  	var value = document.getElementById('usernames').value;
   	if (value.length !=0){
   		document.getElementById('setik').style.display = 'block';

	}
    else{
     	document.getElementById('setik').style.display = 'none';

    } 
}
function ok(){
  var value = document.getElementById('deh').value;
  if (value.length !=0){
  document.getElementById("ko").style.display = "block";
  }
  else{
  document.getElementById('ko').style.display = 'none'; 
    }
}
function respons(){
  var x = document.getElementById("myTopnav");
  if(x.className === "topnav"){
    x.className += " responsive";
  } 
  else{
    x.className = "topnav";
  }
}
function copy(){
  var copyText = document.getElementById("hide");
  copyText.select();
  document.execCommand("copy");
  document.getElementById("hide").value="Key copied"
 interVal= setInterval(function(){; 
  document.getElementById("hide").value=de
  clearInterval(interVal);
  }, 1000);
  
}

function run(){
  socket.emit('runpy',{run:de})
}
function openterminal() {
  $("#compiler").animate({left: '50%'});
  $("#editor").animate({width: '50%'});
}
socket.on('compilepy',(data)=>{
if(data.key==de){
  openterminal()
document.getElementById('compiler').innerHTML += "<br>";
var despasito=data.run;
var div = document.getElementById('compiler');
div.innerHTML += despasito;
document.getElementById("margat").style.display="none";
document.getElementById("margat").removeAttribute("id");
document.getElementById('compiler').innerHTML += "<br>"+'root@'+nameofuser+':~$<span id="margat">_</span>';
var elem = document.getElementById('compiler');
elem.scrollTop = elem.scrollHeight;
}
})

/*function cl(){
document.getElementById('compiler').innerHTML +='root@'+nameofuser+':~$<span id="margat">_</span>';
}*/
function iam(){
    socket.emit('iam',{mykey:de,myname:nameofuser})
}

function down(){
  socket.emit('pydown',{ke:de})
}
socket.on('dowmpy',(data)=>{
  if(data.do==de){
    window.open('/downloadpy')
  }
})
function uppy(){
  document.getElementById("d").submit();;
}
function xoz(){
  document.getElementById('xozuk').click();
}
function cose(){
   socket.emit('closeterminal',{key:de})
}
socket.on('closs',(data)=>{
if(data.yourkey==de){
  coseterminal()
}
})
function coseterminal(){
  $("#compiler").animate({left: '100%'});
  $("#editor").animate({width: '100%'});
  //socket.emit('runpy',{run:de})
}
