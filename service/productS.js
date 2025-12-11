const db = require("../config/db");

exports.create = async (req, res) => {
  try {
    const { name, price, description, quantity } = req.body;
    const vendor_id = req.user.id;
    if (!name || !price || !description || !quantity) {
      return res
        .status(400)
        .json({ message: "Fill all the necessary feilds!" });
    }
    const [result] = await db.query(
      "INSERT INTO product (name,price,description,quantity,vendor_id) VALUES (?,?,?,?,?)",
      [name, price, description, quantity, vendor_id]
    );
    return res
      .status(201)
      .json({ id: result.insertId, message: "Product Created Successfully!!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const vendor_id = req.user.id;
    const { id } = req.params;
    const { name, price, description, quantity } = req.body;

    const checkVendor = await db.query(
        "Select * from product where product_id = ?", 
        [id]);


    if (vendor_id != checkVendor[0][0].vendor_id)
      throw new Error("You are not the seller of this product. You can not perform this operation.");

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

    if (quantity !== undefined) {
      fields.push("quantity = ?");
      values.push(quantity);
    }

    if (fields.length === 0) {
      return res
        .status(400)
        .json({ message: "Provide at least one field to update" });
    }

    const sql = `UPDATE product SET ${fields.join(", ")} WHERE product_id = ?`;
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

exports.delete = async (req, res) => {
  try {
    const vendor_id = req.user.id;
    const { id } = req.params;

    const checkVendor = await db.query(
        "Select * from product where product_id = ?", 
        [id]);


    if (vendor_id != checkVendor[0][0].vendor_id)
      throw new Error("You are not the seller of this product. You can not perform this operation.");

    const [del] = await db.query("Delete FROM product WHERE product_id = ? ", [id]);

    if (del.length === 0) {
      throw new Error("Product not found");
    }

    return res.status(200).json({ message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const vendor_id = req.user.id;

    const [rows] = await db.query(
        "SELECT * FROM product where vendor_id = ?",
        [vendor_id]);

    if(rows.length == 0)
        return res.status(200).json({message:"You have no product listed yet."})

    return res.status(200).send(rows);
    }
    catch (error) 
    {
    res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
  try {
    
    const vendor_id = req.user.id;
    const {id} = req.params;

    console.log(id,vendor_id)

    const [row] = await db.query(
    "SELECT * FROM product WHERE (product_id, vendor_id) = (?, ?)",
    [id, vendor_id]
    );

    if (row.length === 0) 
    {
      throw new Error("No Such Product Found");
    }
    return res.status(200).send(row);
    } 
    catch (error) 
    {
    res.status(500).json({ error: error.message });
    }
};
