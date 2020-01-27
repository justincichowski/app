module.exports=function(io,socketnum,SocketIOFileUpload,socketConnect,socketDisConnect,app){
var filescomplete=1;var files=[];var filenames='';var filenamesorig='';var filenamesBeforeFilter='';
const keyis='$#nasdfbsv0whjae0nASDVFDSsoi2ds#';
//CANNOT USE 2 PM2io.adapter(require('socket.io-pm2')());//required pm2
var clientsnamesp = {};//globalnamespclients//required global
var clients = {};//globalclients//required global
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
io.on('connection', (socket) => { 
	console.log('connected:'+socket.id);


	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);
		io.to(user.room).emit('message', { user: user.name, text: message });
		callback();
	});
	socket.on('join', ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name, room });
		if(error) return callback(error);
		if(user && user.room){socket.join(user.room);}
		//send user welcome to room message
		socket.emit('message', { user: 'admin', text: user.name+' welcome to the room '+user.room+'.'});
		//send room joined message
		socket.broadcast.to(user.room).emit('message', { user: 'admin', text: user.name+' has joined!' })
		//update room data
		io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
		callback();//call back no error
	});
	socket.on('disconnect', () => { console.log('disconnect:'+socket.id);
		const user = removeUser(socket.id);
		if(user && user.room) {
			io.to(user.room).emit('message', { user: 'Admin', text: user.name+' has left.' });
			io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
		}
	});
	














	var cookies=socket.handshake.headers.cookie; 
	var cookiesparsed='';
	if(cookies&&Object.keys(cookies).length !== 0){
	  cookiesparsed=require('cookie').parse(cookies);
	}
	cookies = {};//reset and rebuild with encrypted marked for unecryption
	for(var key in cookiesparsed){if(cookiesparsed[key].indexOf('s:')!=-1){cookies[key]=cookiesparsed[key].split('s:')[1];}}
	var signedCookies='';
	if(Object.keys(cookies).length !== 0){
	  signedCookies=require('cookie-encrypter').decryptCookies(cookies,{algorithm:'aes256',key:keyis}); 
	} 
	clients[socket.id] = socket;
	if((socketnum!=0000  && socketnum!=4999
	&& signedCookies.user  && signedCookies.user!='')===false
	){//nousername
	  socketConnect(socket);//must connect 
	}else if((socketnum!=0000  && socketnum!=4999
	&& signedCookies.user  && signedCookies.user!='')//if not global
	){
	  /*socket.join(signedCookies.user);
	  io.of('/'+signedCookies.user).on('connection', function(socketnamesp) {
		if(clientsnamesp[socketnamesp.id]){//all pass if element doesnt exists... delete on disconnect
		}else{
		  clientsnamesp[socketnamesp.id] = socketnamesp;
		  console.log(socketnamesp.id+' :nmsconnect');
		  socketnamesp.on('disconnect', function() {
			console.log(socketnamesp.id+' :nmsdisconnect');
			socketDisConnect(socketnamesp);
			delete clientsnamesp[socketnamesp.id];//removenamespclient
		  }); 
		  socketConnect(socketnamesp);
		  var cookies=socketnamesp.handshake.headers.cookie; 
		  var cookiesparsed=require('cookie').parse(cookies);
		  var cookiesPlain = {};//reset and rebuild
		  var cookiesSigned = {};//reset and rebuild with encrypted marked for unecryption
		  for(var key in cookiesparsed){
			if(cookiesparsed[key].indexOf('s:')!=-1){cookiesSigned[key]=cookiesparsed[key].split('s:')[1];
			}else{cookiesPlain[key]=cookiesparsed[key];}
		  }
		  if(Object.keys(cookiesSigned).length !== 0){
		    var signedCookies=require('cookie-encrypter').decryptCookies(cookiesSigned,{algorithm:'aes256',key:keyis});
		  }
		  var filesUploadOut=function(files,usersecure){}
		  const uploader = new SocketIOFileUpload();
		  uploader.listen(socketnamesp);
		  var filesdone=0;
		  uploader.on("start", function(event){
			files=[];//reset files on start
			//console.log(event.file);//start then check with uploadValidator
		  }); 
		  uploader.uploadValidator = function(event, callback){
			var req=event.file;
			//validates and Uploads file does not Post entry
			var formName=event.file.body.formName;
			req.signedCookies=signedCookies;
			req.cookies=cookiesPlain;
			if(!req.headers){req.headers={};}
			req.headers.hostname='app.chattank.com';		  
			req.app=app;
			var res='';
			require('./iofilecheck')(req, res, function(validatedval,dir,res){
				uploader.dir = dir;
				if(validatedval!==false){ llback(true); filesdone++;
				}else{ callback(false); }//wrong type
			});
		  }
		  uploader.on("error", function(event){
			console.log("Error from uploader", event);
		  });
		  uploader.on("complete", function(event){
			var req = {
			  name: event.file.name,
			  newName: event.file.newName,
			  formName: event.file.body.formName,
			  body: event.file.body,
			  formdata: event.file.formdata,
			  type: event.file.type,
			  size: event.file.size
			};		
		  });
		}
	  });*/
	}
  });
}