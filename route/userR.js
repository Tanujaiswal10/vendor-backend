const userController = require("../controller/userC")
const express = require("express")
const route = express.Router();
const authorization = require('../middleware/userM')

route.post('/create',userController.createProfile);
route.post('/login',userController.loginProfile);
route.patch('/update',authorization,userController.updateProfile);
route.delete('/delete',authorization,userController.deleteProfile);
route.get('/getById',authorization,userController.getProfile);


module.exports = route;