import multer from 'multer'

//storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = file.mimetype.split('/')[1];
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  }
});

const upload = multer({storage});

export default upload