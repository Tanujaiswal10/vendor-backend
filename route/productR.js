const productController = require("../controller/productC")
const express = require("express")
const authorization = require('../middleware/vendorM')
const route = express.Router();

route.post('/create',authorization,productController.createProduct);
route.patch('/update/:id',authorization,productController.updateProduct);
route.delete('/delete/:id',authorization,productController.deleteProduct);
route.get('/getAll',authorization,productController.getAllProduct);
route.get('/getById/:id',authorization,productController.getByIdProduct);


module.exports = route;