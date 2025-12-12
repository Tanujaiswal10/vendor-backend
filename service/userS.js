require("dotenv").config();
const db = require("../config/db")
const  bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.createProfile = async(req,res) => {
    try{
        const {name,email,phone_no,password,address} = req.body;
        const hashpassword = await bcrypt.hash(password,10)
        const [result] = await db.query(
            'INSERT INTO user (name, email, phone_no,password,address) VALUES (?, ?, ?, ?, ?)',
            [name,email,phone_no,hashpassword,address]
        )
        return res.status(201).json({
            id : result.insertId,
            message:"User Profile Created"
        }
        )
    }
    catch(error)
    {
        res.status(500).json({ error: error.message });
    }
}

exports.loginProfile = async(req,res) =>{
    try{
        const {email, password} = req.body;
        const [rows] = await db.query(
          'Select * from user where email = ?',
          [email]
        )
        if(rows.length === 0 )
        {
          throw new Error("No such user account existed")
        }
        const user = rows[0]
        const matchPassword = await bcrypt.compare(password,user.password)
        if(!matchPassword)
            return res.status(401).json({
                success:false,
                message:"Incorrect Password"
        })
        const token = jwt.sign(
        { id:user.user_id },
         process.env.JWT_SECRET ,
        { expiresIn: "1h" }
        );

        return res.status(200).json({
          token:token,
          message:"Login Successfully!!!"
        })
    }
    catch(error)
    {
      return res.status(500).json({
        message:error.message
      })
    }
}



exports.deleteProfile = async (req,res) =>{
    try{
        // const id = req.user.id;
        const {id} = req.params

        const [del] = await db.query ('Delete FROM user WHERE user_id = ? ',
        [id]
        )

        if(del.length === 0)
        {
            throw new Error ("User account not found")
        }

        return res.status(200).json({message:"User account Deleted"})

    }
    catch(error)
    {
        res.status(500).json({ error: error.message });
    }
}


exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone_no, currentPassword, newPassword, address } = req.body;

    const fields = [];
    const values = [];

    if (name !== undefined) {
      fields.push("name = ?");
      values.push(name);
    }

    if (email !== undefined) {
      fields.push("email = ?");
      values.push(email);
    }

    if (phone_no !== undefined) {
      fields.push("phone_no = ?");
      values.push(phone_no);
    }

    if (address !== undefined) {
      fields.push("address = ?");
      values.push(address);
    }

    if (newPassword !== undefined) {
      if (!currentPassword) {
        return res
          .status(400)
          .json({ message: "Provide currentPassword to change password" });
      }

      const [rows] = await db.query(
        "SELECT password FROM user WHERE user_id = ?",
        [id]
      );

      if (!rows || rows.length === 0) {
        return res.status(404).json({ message: "User account not found" });
      }

      const vendor = rows[0];
      const match = await bcrypt.compare(currentPassword, vendor.password);
      if (!match) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }

      if (typeof newPassword !== "string" || newPassword.length < 6) {
        return res
          .status(400)
          .json({ message: "New password must be at least 6 characters" });
      }

      const saltRounds = 10;
      const hashed = await bcrypt.hash(newPassword, saltRounds);

      fields.push("password = ?");
      values.push(hashed);
    }

    if (fields.length === 0) {
      return res
        .status(400)
        .json({ message: "Provide at least one field to update" });
    }

    const sql = `UPDATE user SET ${fields.join(", ")} WHERE user_id = ?`;
    values.push(id);

    const [update] = await db.query(sql, values);

    if (update.affectedRows === 0) {
      return res.status(404).json({ message: "User account not found" });
    }

    return res.status(200).json({ message: "User account Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


exports.getProfile = async(req,res) =>{
    try{
        // const id = req.user.id;
        const {id} = req.params
        const [row] = await db.query('SELECT user_id, name, email, phone_no, address FROM user WHERE user_id = ?', [id])

        if(row.length == 0)
            return res.status(404).json({message:"No such seller account found"})

        return res.status(200).send(row)
    }
    catch(error)
    {
        return res.status(500).json({error:error.message})
    }
    
}