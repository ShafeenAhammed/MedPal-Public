const express= require("express");
const multer = require('multer');
const doctorController = require("../controller/doctorController");
const doctorMiddle = require("../middleware/doctorMiddle");
const doctorRoute = express();

doctorRoute.use((req, res, next) => {
    console.log(`inside doctor routes ${req.method} ${req.url}`);
    next();
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './assets/uploads');
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({ storage: storage })

doctorRoute.post('/register',upload.fields([{ name: 'doctorImage', maxCount: 1 }, { name: 'licenseFile', maxCount: 1 }]),doctorController.register);
doctorRoute.post('/login',doctorController.login);

module.exports = doctorRoute