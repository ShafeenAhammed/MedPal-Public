const express= require("express");
const multer = require('multer');
const doctorController = require("../controller/doctorController");
const doctorMiddle = require("../middleware/doctorMiddle");
const doctorRoute = express();

doctorRoute.use((req, res, next) => {
    console.log(`inside doctor routes of doc service ${req.method} ${req.url}`);
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

doctorRoute.get('/get-slots',doctorController.getSlots);
doctorRoute.post('/add-slot',doctorController.addSlot);
doctorRoute.get('/get-doctors',doctorController.getDoctors);
doctorRoute.get('/doctors-specialities', doctorController.specialization)
doctorRoute.get('/get-doctorbyid',doctorController.getDoctorById);
doctorRoute.get('/get-doctorimage',doctorController.getDocImg);
doctorRoute.post('/make-appoinment',doctorController.makeAppoinment);
doctorRoute.patch('/update-appoinment',doctorController.updateAppoinment);
doctorRoute.get('/get-customer-appoinments',doctorController.getCustomerAppoinments);
doctorRoute.get('/get-doc-appoinments',doctorController.getDocAppoinments);
doctorRoute.get('/get-doc-stats',doctorController.docStats);
doctorRoute.patch('/complete-appointment',doctorController.completeAppointment);


module.exports = doctorRoute