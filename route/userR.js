const userController = require("../controller/userC")
const express = require("express")
const route = express.Router();
const authorization = require('../middleware/vendorM')

route.post('/create',userController.createProfile);
route.post('/login',userController.loginProfile);
route.patch('/update/:id',userController.updateProfile);
route.delete('/delete/:id',userController.deleteProfile);
route.get('/getById/:id',userController.getProfile);


module.exports = route;