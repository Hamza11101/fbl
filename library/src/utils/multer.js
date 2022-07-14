const multer  = require('multer')
const path = require('path');
const { v4: uuid } = require('uuid'); 

var storage = multer.diskStorage({   
  destination: (req, file, cb) =>{ 
     cb(null, './src/uploads');    
  }, 
  filename:  (req, file, cb) =>{ 
    const newFileName=uuid()+ path.extname(file.originalname);
     cb(null , newFileName);  
     
  }
});

function fileFilter (req, file, cb) {
  var ext = path.extname(file.originalname);
  if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      console.log("no");
      return cb(new Error('Only images are allowed'))
  }
  cb(null, true)
}


const upload = multer({ storage: storage, fileFilter: fileFilter})
module.exports = upload;