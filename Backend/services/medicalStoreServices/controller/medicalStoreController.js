const notification = require('notification-npm-package');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const medicalStoreCollection = require('../model/medicalStoreSchema');
const categoryCollection = require('../model/categorySchema');
const orderCollection = require('../model/orderSchema');
const path = require('path');
const Razorpay = require('razorpay');




module.exports = {
    registerMedicalStore : async (req,res)=>{
        try{
            // console.log(req.body.med);
            const med = JSON.parse(req.body.storeDatas);
            const {
                medId,
                storeName,
                ownerName,
                email,
                license,
                mobile,
                address,
                deliveryExecLocation,
                applicationStatus
                
            } = med
            const storeImage = req.files['storeImage'][0].filename;
            const licenseFile = req.files['licenseFile'][0].filename;

            const check= await medicalStoreCollection.findOne({email:med.email});
            if(check){
                res.status(400).json({message:"Email already exists",email:med.email,exist:true});
            }else{
                await medicalStoreCollection.insertMany({
                    medId,
                    storeName,
                    ownerName,
                    email,
                    license,
                    storeImage,
                    licenseFile,
                    mobile,
                    address,
                    deliveryExecLocation,
                    applicationStatus
                    
                });
                res.status(200).json({message:"success", email:med.email,exist:false});
            }
        }
        catch(err){
            console.error("Error in adding medcial store to medService", err.message);
            res.status(500).json({
                status: 'error',
                message: `Error adding medcial store to medService => ${err}`,
            });
        }

    },

    addProduct : async (req,res)=>{
        try{
            // console.log("body of add prod",req.body);
            const medId = req.body.medId;
            const productData = JSON.parse(req.body.productData)
            const {
                productName,
                productCategory,
                mfgDate,
                expDate,
                price,
                stock,
                description
            } = productData;
            const medicalStore = await medicalStoreCollection.findOne({ medId });
            if (!medicalStore) {
                return res.status(404).json({ error: 'Medical store not found' });
            }

            medicalStore.products.push({
                productId: uuidv4(),
                productName,
                productImages: req.file.filename,
                productCategory,
                mfgDate,
                expDate,
                price,
                stock,
                description
            });
            await medicalStore.save();

            res.status(200).json({ message: 'Product added successfully' });

        }
        catch(err){
            console.error('Error adding product:', err.message);
            res.status(500).json({ error: `Error adding product => ${err.message}` });
        }
    },
    addCategory : async(req,res)=>{
        try{
            console.log(req.body);
            const check= await categoryCollection.findOne({categoryName:req.body.categoryName});
            if(check){
                res.status(400).json({message:"Category already exists",exist:true});
            }else{
                await categoryCollection.insertMany([req.body]);
                res.status(200).json({message:"success",exist:false});
            }
        }
        catch(err){
            console.error("Error in adding category", err);
            res.status(500).json({
                status: 'error',
                message: `Error adding category => ${err}`,
            });
        }
    },
    getCategory: async(req,res)=>{
        try{
            const cat = await categoryCollection.find();
            res.status(200).json({message:"success",category: cat});
        }
        catch(err){
            console.error("Error in getting category", err);
            res.status(500).json({
                status: 'error',
                message: `Error getting category => ${err}`,
            });
        }
    },
    listStores: async (req,res)=>{
        try{
            console.log("heree");
            const meds = await medicalStoreCollection.find();
            res.status(200).json({meds:meds,message:"success"});
        }
        catch(err){
            console.error("Error in getting meds datas",err);
            res.status(500).json({message:`Some error occurred ${err}`});
        }
    },
    getMedStoreById: async (req,res)=>{
        try{
            const med = await medicalStoreCollection.findOne({medId : req.query.medId});
            res.status(200).json({med:med,message:"success"});
        }
        catch(err){
            console.error("Error in getting meds datas",err);
            res.status(500).json({message:`Some error occurred ${err}`});
        }
    },
    getProductImg: async (req,res)=>{
        try {
            const imageName = req.query.imageName;
            const imagePath = path.join(__dirname, '../assets/uploads', imageName);
            // console.log("pathuu",imagePath);
            res.sendFile(imagePath);
        } catch (err) {
            console.error('Error retrieving product image:', err.message);
            res.status(500).json({ error: `Error retrieving product image => ${err.message}` });
        }
    },

    getProducts: async (req, res) => {
        try {
            const { medId } = req.query;
    
            if (!medId) {
                return res.status(400).json({ message: "medId parameter is required" });
            }
    
            console.log(`Fetching products for medical store with medId: ${medId}`);
    
            const medicalStore = await medicalStoreCollection.findOne({ medId });
    
            if (!medicalStore) {
                return res.status(404).json({ message: `Medical store with medId ${medId} not found` });
            }
    
            const products = medicalStore.products || [];
            res.status(200).json({ products:products, message: "success" });
        } catch (err) {
            console.error("Error in getting products data", err);
            res.status(500).json({ message: `Some error occurred ${err}` });
        }
    },
    findProduct: async(req,res)=>{
        try {
            const productId = req.query.productId; 
    
            if (!productId) {
                return res.status(400).json({ error: "productId is required" });
            }
    
            const medicalStore = await medicalStoreCollection.findOne({ "products.productId": productId });
    
            if (!medicalStore) {
                return res.status(404).json({ error: "Product not found in any medical store" });
            }
    
            const product = medicalStore.products.find(p => p.productId === productId);
    
            if (!product) {
                return res.status(404).json({ error: "Product not found in the specified medical store" });
            }
    
            res.status(200).json({ product });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    placeOrder:async (req,res)=>{
        try {
            const razorpayInstance = new Razorpay({
                key_id: process.env.RAZORPAY_ID_KEY,
                key_secret: process.env.RAZORPAY_SECRET_KEY
            });

            const order = await razorpayInstance.orders.create({
                amount: req.body.orderTotal *100,
                currency: 'INR',
              });

            const addedOrder = await orderCollection.create(req.body);
            console.log("Order inserted:", order);
            console.log("Order ID:", order.id);
            res.status(200).json({
                success:true,
                status: 'success',
                message: 'Order placed successfully',
                order_id: order.id,
                order: addedOrder
            });
        } catch (err) {
            console.error("Error placing order:", err);
            res.status(500).json({
                success:false,
                status: 'failed',
                message: 'Error placing order',
            });
        }
    },
    updateOrder: async(req,res)=>{
        try{
            const customerId = req.body.customerId;
            const medId = req.body.medId;
            const orderId = req.body.orderId;
            if(req.body.paymentStatus === 'Success'){
                const order = await orderCollection.findOne({orderId: req.body.orderId});
                const newOrder = await orderCollection.findOneAndUpdate({orderId: req.body.orderId},{$set:{paymentId:req.body.paymentId, razorpayOrderId:req.body.razorpayOrderId,paymentStatus:req.body.paymentStatus,orderStatus:req.body.orderStatus}},{ returnDocument: 'after'});
                for (const product of order.products) {
                    const productId = product.productId;
                    const productQuantity = product.productQuantity;
                    await medicalStoreCollection.findOneAndUpdate(
                      { medId:medId, 'products.productId': productId },
                      {
                        $inc: { 'products.$.stock': -productQuantity }
                      },
                      { returnDocument: 'after' }
                    );
                }

                try{
                    await axios.patch('http://localhost:3001/customer/emptycart', { customerId });
                    res.status(200).json({
                        success: true,
                        status: 'success',
                        message: 'Order updated successfully',
                        orderId: orderId
                      });
                }
                catch(err){
                    console.error("Axios error:", err.message);
                    res.status(500).json({
                      success: false,
                      status: 'failed',
                      message: 'Error making Axios request to empty cart',
                    });
                }


            }else{
                await orderCollection.updateOne({orderId: req.body.orderId},{$set:{paymentId:req.body.paymentId, razorpayOrderId:req.body.razorpayOrderId,paymentStatus:req.body.paymentStatus,orderStatus:req.body.orderStatus}});
            }
        }
        catch (err) {
            console.error("Error updating order:", err.message);
            res.status(500).json({
                success:false,
                status: 'failed',
                message: 'Error updating order',
            });
        }
    },
    updateOrderStatus: async(req,res)=>{
        try{
            await orderCollection.updateOne({orderId: req.body.orderId},{ $set: { orderStatus: req.body.orderStatus } });
            res.status(200).json({
                success:true,
                status: 'success',
                message: 'Order status updated successfully',
            });
        }
        catch(err){
            console.error("Error updating order status:", err.message);
            res.status(500).json({
                success:false,
                status: 'failed',
                message: 'Error updating orderstatus',
            });
        }
    },
    getOrder: async(req,res)=>{
        try{
            const order = await orderCollection.findOne({orderId:req.query.orderId})
            res.status(200).json({
                success: true,
                status: 'success',
                order: order
              });
        }catch(err){
            console.error("Error getting order:", err.message);
            res.status(500).json({
                success:false,
                status: 'failed',
                message: 'Error getting order',
            });
        }
    },
    getCustomerOrders: async (req,res)=>{
        try{
            const orders = await orderCollection.find({customerId:req.query.customerId})
            res.status(200).json({
                success: true,
                status: 'success',
                orders: orders
              });
        }catch(err){
            console.error("Error getting customer order:", err.message);
            res.status(500).json({
                success:false,
                status: 'failed',
                message: 'Error getting customer order',
            });
        }
    },

    search: async (req, res) => {
        try {
          const query = req.query.data;
      
          const productResults = await medicalStoreCollection.find({
            'products.productName': { $regex: query, $options: 'i' }
          }).exec();
      
          const storeResults = await medicalStoreCollection.find({
            'storeName': { $regex: query, $options: 'i' }
          }).exec();
          console.log("PRO",productResults);
          console.log("store",storeResults);
          const processedResults = {
            products: mapProductResults(productResults, query),
            stores: mapStoreResults(storeResults),
          };
          console.log(processedResults);
          res.json(processedResults);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },

      listOrders: async (req, res) => {
        try{
            const orders = await orderCollection.find({medId: req.query.medId});
            res.status(200).json({
                success: true,
                status: 'success',
                orders: orders
              });
        }
        catch(err){
            console.error("Error getting orders:", err.message);
            res.status(500).json({
                success:false,
                status: 'failed',
                message: 'Error getting orders',
            });
        }
      },

      getMedStoreStatsForAdmin: async (req,res)=>{
        try {
            const orderDistribution = await orderCollection.aggregate([
                {
                    $group: {
                        _id: '$medId',
                        medName: { $first: "$medName" },
                        totalOrders: { $sum: 1 }
                    }
                }
            ]);
            // console.log("order count", orderDistribution);

            const orders = await orderCollection.find({}, 'orderTime');
            const orderTimeData = {
                morning: 0,
                noon: 0,
                evening: 0,
                night: 0
            };
            orders.forEach(order => {
                const orderTime = order.orderTime;
                const hours = parseInt(orderTime.split(':')[0]);
    
                if (hours >= 0 && hours < 11) {
                    orderTimeData.morning++;
                } else if (hours >= 11 && hours < 15) {
                    orderTimeData.noon++;
                } else if (hours >= 15 && hours < 18) {
                    orderTimeData.evening++;
                } else if (hours >= 19 && hours <= 23) {
                    orderTimeData.night++;
                }
            });
            // console.log("time",orderTimeData);
            res.status(200).json({
                success: true,
                status: 'success',
                orderDistribution: orderDistribution,
                orderTimeData: orderTimeData
            });

        } catch (error) {
            console.error("Error retrieving medical store coordinates:", error);
            res.status(500).json({
                success:false,
                status: 'failed',
                message: 'Error getting locations',
            });
        }
      },
      getMedStatsById : async(req,res)=>{
        try {
            const medId = req.query.medId;
            const orders = await orderCollection.find({ medId });

            const productCounts = {};

            orders.forEach(order => {
              order.products.forEach(product => {
                const { productName, productQuantity } = product;
                productCounts[productName] = (productCounts[productName] || 0) + productQuantity;
              });
            });
            console.log("productCounts",productCounts);

            const categoryCounts = {};
            
            for (const order of orders) {
                for (const product of order.products) {
                    const { productId, productQuantity } = product;

                    const medStore = await medicalStoreCollection.findOne({ medId });
                    const productDetails = medStore.products.find(p => p.productId === productId);

                    const productCategory = productDetails.productCategory;

                    categoryCounts[productCategory] = (categoryCounts[productCategory] || 0) + productQuantity;
                }
            }
            console.log("categoryCounts",categoryCounts);

            res.status(200).json({productCounts: productCounts, categoryCounts:categoryCounts});
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
          }
      },

}

function mapProductResults(results, query) {
    return results.flatMap(result => {
      if (result.products && result.products.length > 0) {
        const matchingProducts = result.products.filter(product =>
          product.productName.toLowerCase().includes(query.toLowerCase())
        );
  
        return matchingProducts.map(product => ({
          type: 'product',
          productName: product.productName,
          description: product.description,
          storeName: result.storeName,
        }));
      }
      return [];
    });
  }
  
  function mapStoreResults(results) {
    return results.map(result => ({
      type: 'store',
      storeName: result.storeName,
      address: result.address,
    }));
  }
  