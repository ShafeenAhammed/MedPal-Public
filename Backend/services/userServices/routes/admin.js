const express= require("express");
const adminController = require("../controller/adminController");
const adminMiddle = require("../middleware/adminMiddle");

const adminRoute = express();

adminRoute.use((req, res, next) => {
    console.log(`inside admin ${req.method} ${req.url}`);
    next();
});

adminRoute.post('/login',adminController.login);
adminRoute.get('/get-customers',adminMiddle.tokenValidate,adminController.getCustomers);
adminRoute.patch('/block-customers',adminMiddle.tokenValidate,adminController.blockCustomers);
adminRoute.get('/get-med-requests',adminController.getMedRequests);
adminRoute.get('/get-licensefile',adminController.getMedLicenseFile);
adminRoute.patch('/medrequest', adminController.medReqDecision);
adminRoute.get('/get-medicalstores', adminController.getMedicalStores);
adminRoute.patch('/block-medicalstores',adminMiddle.tokenValidate,adminController.blockMedicalStores);

adminRoute.get('/get-doc-requests',adminController.getDoctorRequests);
adminRoute.get('/get-doc-licensefile',adminController.getDoctorLicenseFile);
adminRoute.patch('/doctorrequest', adminController.docReqDecision);

module.exports = adminRoute