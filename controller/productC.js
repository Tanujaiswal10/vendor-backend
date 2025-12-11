const productService = require("../service/productS")

exports.createProduct = async(req,res) =>{
    try{
        const {name,price,description,quantity} = req.body;
        if(!name || !price || !description || !quantity)
        {
            return res.status(400).json({message:"Fill all the necessary feilds!"})
        }
        const result = await productService.create(req,res);
        return result;
    }
    catch(error)
    {
         res.status(500).json({ error: error.body });
    }
}
exports.updateProduct = async(req,res) => {
    try{
        const{id} =req.params
        if(!id)
            throw new Error("Please provide the Id of the product")

        const result = await productService.update(req,res);
        return result; 
    }
    catch(error)
    {
         res.status(500).json({ error: error.body });
    }
}

exports.deleteProduct = async(req,res) => {
    try{
        const{id} =req.params
        if(!id)
            throw new Error("Please provide the Id of the product")

        const result = await productService.delete(req,res);
        return result; 
    }
    catch(error)
    {
         res.status(500).json({ error: error.body });
    }
}

exports.getByIdProduct = async(req,res) => {
    try{
        const{id} =req.params
        if(!id)
            throw new Error("Please provide the Id of the product")

        const result = await productService.getById(req,res);
        return result; 
    }
    catch(error)
    {
         res.status(500).json({ error: error.body });
    }
}

exports.getAllProduct = async(req,res) => {
    try{
        const result = await productService.getAll(req,res);
        return result; 
    }
    catch(error)
    {
         res.status(500).json({ error: error.body });
    }
}