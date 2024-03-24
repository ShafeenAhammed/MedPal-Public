const express = require('express');
const path = require('path');
const medicalStoreController = require('../controller/medicalStoreController');
const multer = require('multer');
const medicalStoreMiddle = require('../middleware/medicalStoreMiddle');
const medicalStoreRoute = express();
medicalStoreRoute.use((req, res, next) => {
    console.log(`inside medical ${req.method} ${req.url}`);
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

medicalStoreRoute.post('/register-medicalstore',upload.fields([{ name: 'storeImage' }, { name: 'licenseFile' }]),medicalStoreController.registerMedicalStore);
medicalStoreRoute.post('/addproduct',upload.single('productImages'),medicalStoreController.addProduct);
medicalStoreRoute.post('/addcategory',medicalStoreController.addCategory);
medicalStoreRoute.get('/getcategory',medicalStoreController.getCategory);
medicalStoreRoute.get('/liststores',medicalStoreController.listStores);
medicalStoreRoute.get('/getproductimages',medicalStoreController.getProductImg);
medicalStoreRoute.get('/get-medstore',medicalStoreController.getMedStoreById);
medicalStoreRoute.get('/listproducts',medicalStoreController.getProducts);
medicalStoreRoute.get('/getproduct',medicalStoreController.findProduct);
medicalStoreRoute.post('/place-order',medicalStoreController.placeOrder);
medicalStoreRoute.patch('/update-order',medicalStoreController.updateOrder);
medicalStoreRoute.get('/get-order',medicalStoreController.getOrder);
medicalStoreRoute.get('/search',medicalStoreController.search);
medicalStoreRoute.get('/list-orders',medicalStoreController.listOrders);
// medicalStoreRoute.get('/get-orderbyid',medicalStoreController.getOrderById);
medicalStoreRoute.get('/get-customerorders',medicalStoreController.getCustomerOrders);
medicalStoreRoute.patch('/update-orderstatus',medicalStoreController.updateOrderStatus);
medicalStoreRoute.get('/get-admin-med-stats',medicalStoreController.getMedStoreStatsForAdmin);
medicalStoreRoute.get('/get-med-stats',medicalStoreController.getMedStatsById);

module.exports = medicalStoreRoute;