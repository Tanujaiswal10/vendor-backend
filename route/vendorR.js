const sellerController = require("../controller/vendorC")
const express = require("express")
const route = express.Router();

route.post('/create',sellerController.createProfile);
route.patch('/update/:id',sellerController.updateProfile);
route.delete('/delete/:id',sellerController.deleteProfile);
route.get('/getById/:id',sellerController.getProfile);


module.exports = route;