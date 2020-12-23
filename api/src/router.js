const { Router } = require('express');
const multer = require('multer');
const router = Router();

const fileName = (request, file, callback) =>{
    callback(null, file.originalname);
};

const storage= multer.diskStorage({
    destination: 'api/uploads/',
    fileName
});

const fileFilter = (request, file, callback)=>{
    if(file.mimeType !== 'image/png'){
        request.fileValidationError= 'Wrong File Type';
        callback(null, false, new Error(request.fileValidationError));
    }else{
        callback(null, true);
    }
};

const upload = multer({
    fileFilter,
    storage
});

router.post('/upload', upload.single('photo'),(request, response) =>{
    if(request.fileValidationError !== undefined){
        return response.status(400).json({
            error: request.fileValidationError
        });
    }else{
        response.status(201).json({
            success: true
        });
    }
});

module.exports= router;



