const db = require("../config/db")

exports.createProfile = async(req,res) => {
    try{
        const {name,email,phone_no} = req.body;
        const [result] = await db.query(
            'INSERT INTO seller (name, email, phone_no) VALUES (?, ?, ?)',
            [name,email,phone_no]
        )
        return res.status(201).json({
            id : result.insertId,
            message:"Seller Profile Created"
        }
        )
    }
    catch(error)
    {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteProfile = async (req,res) =>{
    try{
        const {id} = req.params

        const [del] = await db.query ('Delete FROM seller WHERE seller_id = ? ',
        [id]
        )

        if(del.affectedRows === 0)
        {
            throw new Error ("Seller account not found")
        }

        return res.status(200).json({message:"Seller account Deleted"})

    }
    catch(error)
    {
        res.status(500).json({ error: error.message });
    }
}


exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone_no } = req.body;

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

    if (fields.length === 0) {
      return res
        .status(400)
        .json({ message: "Provide at least one field to update" });
    }

    const sql = `UPDATE seller SET ${fields.join(", ")} WHERE seller_id = ?`;
    values.push(id);

    const [update] = await db.query(sql, values);

    if (update.affectedRows === 0) {
      return res.status(404).json({ message: "Seller account not found" });
    }

    return res.status(200).json({ message: "Seller account Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


exports.getProfile = async(req,res) =>{
    try{
        const {id} = req.params;
        const [row] = await db.query('SELECT * FROM seller WHERE seller_id = ?', [id])

        if(row.affectedRows == 0)
            return res.status(404).json({message:"No such seller account found"})

        return res.status(200).send(row)
    }
    catch(error)
    {
        return res.status(500).json({error:error.message})
    }
    
}