const productController = require("../controller/productC")
const express = require("express")
const route = express.Router();

route.post('/create',productController.createProduct);
route.patch('/update/:id',productController.updateProduct);
route.delete('/delete/:id',productController.deleteProduct);
route.get('/getAll',productController.getAllProduct);
route.get('/getById/:id',productController.getByIdProduct);


module.exports = route;