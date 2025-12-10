const sellerService = require("../service/vendorS")

exports.createProfile = async(req,res) =>{
    try{
        const {name,email,phone_no} = req.body;
        if(!name || !email || !phone_no)
        {
            return res.status(400).json({message:"Fill all the necessary feilds!"})
        }
        const result = await sellerService.createProfile(req,res);
        return result;
    }
    catch(error)
    {
         res.status(500).json({ error: error.body });
    }
}

exports.loginProfile = async(req,res) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password)
        {
            throw new error ("Provide an email and password to login")
        }
        const result = await sellerService.loginProfile(req,res)
        return result;
    }
    catch(error)
    {
         res.status(500).json({ error: error.body });
    }
}



exports.updateProfile = async(req,res) => {
    try{
        const{id} =req.params
        if(!id)
            throw new Error("Please provide the Id of Seller Account")

        const result = await sellerService.updateProfile(req,res);
        return result; 
    }
    catch(error)
    {
         res.status(500).json({ error: error.body });
    }
}

exports.deleteProfile = async(req,res) => {
    try{
        const{id} =req.params
        if(!id)
            throw new Error("Please provide the Id of the Seller Account")

        const result = await sellerService.deleteProfile(req,res);
        return result; 
    }
    catch(error)
    {
         res.status(500).json({ error: error.body });
    }
}


exports.getProfile = async(req,res) =>{
    try{
        const {id} = req.params;

        if(!id)
            throw new Error("Please provide the Id of the Seller Account")

        const result = await sellerService.getProfile(req,res);
        return result; 
    }
    catch(error)
    {
         res.status(500).json({ error: error.body });
    }
}