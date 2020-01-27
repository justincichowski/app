module.exports=function(req, res, next){
    try{
      var usersecure='';if(req.signedCookies && req.signedCookies.user){usersecure=req.signedCookies.user;}
      var fields=req.formdata;
      var formName=req.body.formName;
      var fs=require('fs');	
      var spawn=require('child_process').spawn;
      var mime=req.type;//set mime
      var origname=req.name;//set origname
      var size=req.size;//set size
      var _permitted='';
      
      _permitted= new Array(
            'image/gif','image/jpeg','image/bmp','image/webp','image/pjpeg','image/png','image/x-png',
            'video/avi','video/quicktime','video/3gpp','video/mp4','video/mov','video/x-ms-wmv','video/webm','video/mpeg','video/mpg',
            'audio/mp3','audio/mpeg','audio/x-mpeg-3',
            'image/gif','image/jpeg','image/webp','image/bmp','image/pjpeg','image/png','image/x-png');
      
    
      if(!functions.in_array(mime, _permitted)){  
        next(false);
      }else if(size>250000000){	//250mb	
        next(false);
      }else{
        var uploadDir='//qnap1/js/public/users/'+usersecure+'/Files/';
        if(fs.existsSync(uploadDir)==false){fs.mkdirSync(uploadDir, 0700);}/*required*/
        var obj={};
        obj.name=req.name;
        obj.size=req.size;
        obj.fields=req.formdata;
        obj.body=req.body;  
        obj.type=req.type;
        next(true,uploadDir,obj);
        return;
        
      }
      
    }catch(err){console.log(err);}}