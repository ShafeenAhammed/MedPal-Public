const express= require("express");
const multer = require('multer');
const medicalStoreController = require("../controller/medicalStoreController");
const medicalMiddle = require("../middleware/medicalMiddle");
const medicalStoreRoute = express();

medicalStoreRoute.use((req, res, next) => {
    console.log(`inside medical routes ${req.method} ${req.url}`);
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

medicalStoreRoute.post('/register',upload.fields([{ name: 'storeImage', maxCount: 1 }, { name: 'licenseFile', maxCount: 1 }]),medicalStoreController.register);
medicalStoreRoute.post('/login',medicalStoreController.login)

module.exports = medicalStoreRoute