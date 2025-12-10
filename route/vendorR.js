const sellerController = require("../controller/vendorC")
const express = require("express")
const route = express.Router();
const authorization = require('../middleware/vendorM')

route.post('/create',sellerController.createProfile);
route.post('/login',sellerController.loginProfile);
route.patch('/update/:id',authorization,sellerController.updateProfile);
route.delete('/delete/:id',authorization,sellerController.deleteProfile);
route.get('/getById',authorization,sellerController.getProfile);


module.exports = route;