import path from "path";

const multer = require('multer');

// File Filter
function myFilter(req: any, file: any, cb: any) {
    var imageType = file.mimetype.split('/')[0];
    if (imageType == 'image') {
        cb(null, true)
    } else {
        req.fileTypeError = true;
        cb(null, false);
    }
}

// Taking control of uploaded file
const myStorage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        if (file.fieldname == 'post') {
            cb(null, path.join(process.cwd(), '/src/uploads/post'))
        } else if (file.fieldname == 'profile') {
            cb(null, path.join(process.cwd(), '/src/uploads/profile'))
        } else {
            cb(null, path.join(process.cwd(), '/src/uploads/guide'))
        }
    },
    filename: function (req: Request, file: any, cb: any) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const uploader = multer({
    storage: myStorage,
    fileFilter: myFilter
})

export default uploader;