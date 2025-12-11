const userController = require("../controller/userC")
const express = require("express")
const route = express.Router();
const authorization = require('../middleware/vendorM')

route.post('/create',userController.createProfile);
route.post('/login',userController.loginProfile);
// route.patch('/update/:id',authorization,sellerController.updateProfile);
// route.delete('/delete/:id',authorization,sellerController.deleteProfile);
// route.get('/getById',authorization,sellerController.getProfile);


module.exports = route;