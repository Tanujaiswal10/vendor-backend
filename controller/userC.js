const userService = require("../service/userS")

exports.createProfile = async(req,res) =>{
    try{
        const {name,email,phone_no,password,address} = req.body;
        if(!name || !email || !phone_no || !password || !address)
        {
            return res.status(400).json({message:"Fill all the necessary feilds!"})
        }
        const result = await userService.createProfile(req,res);
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
        const result = await userService.loginProfile(req,res)
        return result;
    }
    catch(error)
    {
         res.status(500).json({ error: error.body });
    }
}
