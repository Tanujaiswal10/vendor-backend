const db = require("../config/db")

exports.create = async(req,res) => {
    try
    {
        const {name,price,description} = req.body;
        if(!name || !price || !description)
        {
            return res.status(400).json({message:"Fill all the necessary feilds!"})
        }
        const [result] = await db.query(
            'INSERT INTO product (name,price,description) VALUES (?,?,?)',
            [name,price,description]
        );
        return res.status(201).json({id:result.insertId,message:"Product Created Successfully!!"})
    }
    catch(error)
    {
        res.status(500).json({ error: error.message });
    }
}

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    const fields = [];
    const values = [];

    if (name !== undefined) {
      fields.push("name = ?");
      values.push(name);
    }

    if (price !== undefined) {
      fields.push("price = ?");
      values.push(price);
    }

    if (description !== undefined) {
      fields.push("description = ?");
      values.push(description);
    }

    if (fields.length === 0) {
      return res
        .status(400)
        .json({ message: "Provide at least one field to update" });
    }

    const sql = `UPDATE product SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    const [update] = await db.query(sql, values);

    if (update.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};




exports.delete = async (req,res) =>{
    try{
        const {id} = req.params

        const [del] = await db.query ('Delete FROM product WHERE id = ? ',
        [id]
        )

        if(del.affectedRows === 0)
        {
            throw new Error ("Product not found")
        }

        return res.status(200).json({message:"Product Deleted"})

    }
    catch(error)
    {
        res.status(500).json({ error: error.message });
    }
}

exports.getAll = async(req,res) => {
    try{
        const [rows] = await db.query ('SELECT * FROM product')
        return res.status(200).send(rows)
    }
    catch(error)
    {
        res.status(500).json({ error: error.message });
    }
}

exports.getById = async(req,res) => {
    try{
        const {id} = req.params;
        const [row] = await db.query('SELECT * FROM product WHERE id = ?' ,
            [id]
        )
        if(row.affectedRows === 0)
        {
            throw new Error ("No Such Product Found")
        }
     return res.status(200).send(row)
    }
    catch(error)
    {
        res.status(500).json({ error: error.message });
    }
}