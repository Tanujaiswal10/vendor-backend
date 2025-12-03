// const mysql = require('mysql2/promise')

// const db = await mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"database890$",
//     //database:
// })

// console.log("MYsql connected successfully!!!")

const mysql = require("mysql2/promise");

async function connectDB() {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "database890$",
      // database: ""
    });

    // const [result] = await db.execute("CREATE DATABASE vendor");
    // console.log("Database created");

    // const showdbs = await db.execute("show databases")
    // console.log(showdbs)

    // const useDb = await db.execute("USE vendor")
    // console.log("using database vendor", useDb)

    await db.query("CREATE DATABASE IF NOT EXISTS vendor");
    console.log("Database created or exists.");

    // select the DB (use query)
    await db.query("USE vendor");
    console.log("Using database vendor");

    // const table = await db.execute(`
    // CREATE TABLE product (
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     name VARCHAR(100) NOT NULL UNIQUE,
    //     price INT NOT NULL,
    //     description VARCHAR(300) NOT NULL
    // );
    // `);
    // console.log("Table created",table);

    // await db.execute(`insert into product (name, price, description) values ('camlin whiteboard black marker', 70, 'best marker')`)
    // console.log("values inserted into the table successfully!!!")

    // using prepared statement

    // await db.execute(`insert into product (name, price, description ) values(?,?,?)`,['camlin whiteboard red marker', 70, 'best red marker'])
    // console.log("values inserted into the table successfully!!!")


    // const items = [
    //   ["camlin whiteboard green marker", 70, "best green marker"],
    //   ["classmate notebook", 50, "soft cover notebook"],
    //   ["apsara pencil", 10, "smooth writing pencil"],
    // ];

    // await db.query("INSERT INTO product (name, price, description) VALUES ?", [
    //   items,
    // ]);

    // console.log("Multiple products inserted!");

    // const [updatee] = await db.execute("update product set name= 'apsara black pencil' where price = 10")
    // const [updatee] = await db.execute("update product set name= ? where price = ? ", [apsara balck pencil , 10])
            //CAN PERFORM THE DELETE OPERATION IN THE SAME WAY!!!

    // console.log(updatee)


    const [deletee] = await db.execute("delete from product where price = 50 ")
    console.log(deletee)


    const [rows] = await db.execute("select * from product where price = 50 ")  //DESCTUCTURING
    console.log(rows)

    console.log("MySQL connected successfully!!!");
  } catch (err) {
    console.error("MySQL connection failed:", err.message);
  }
}

connectDB();
