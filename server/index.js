/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';

const app = express();
import bodyParser from "body-parser";
import mysql from "mysql2";
import cors from "cors";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "user_db",
  });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get/users", (req, res) => {
    const sqlGet = "SELECT * FROM user_db.users";
    db.query(sqlGet, (error, result) => {
      res.send(result);
    });
  });

  app.get("/api/get/products", (req, res) => {
    const sqlGet = "SELECT * FROM user_db.products";
    db.query(sqlGet, (error, result) => {
      res.send(result);
    });
  });
  
  app.post("/api/post/users", (req, res) => {
    const { username, password, email } = req.body;
    const sqlInsert =
      "INSERT INTO user_db.users (username, password, email) VALUES (?, ?, ?)";
    db.query(sqlInsert, [username, password, email], (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send("User added succesfully.");
      }
    });
  });
  
  app.post("/api/post/products", (req, res) => {
    const { name, price, quantity, imgUrl } = req.body;
    const sqlInsert =
      "INSERT INTO user_db.products (name, price, quantity, imgUrl) VALUES (?, ?, ?,?)";
    db.query(sqlInsert, [name, price, quantity, imgUrl], (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send("Product added succesfully.")
      }
    });
  });
  
  app.delete("/api/delete/users/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM user_db.users WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send("User deleted succesfully.")
      }
    });
  });
  
  app.delete("/api/delete/products/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM user_db.products WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send("Product deleted succesfully.")
      }
    });
  });
  
  app.get("/api/get/users/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM user_db.users WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    });
  });
  
  app.get("/api/get/products/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM user_db.products WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    });
  });
  
  app.put("/api/update/users/:id", (req, res) => {
      const { id } = req.params;
      const {username, password, email} = req.body;
      const sqlUpdate = "UPDATE user_db.users SET username = ?, password = ?, email = ? WHERE id = ?";
      db.query(sqlUpdate, [username, password, email, id], (error, result) => {
        if (error) {
          console.log(error);
        }
        res.send("User updated succesfully.");
      });
    });
  
    app.put("/api/update/products/:id", (req, res) => {
      const { id } = req.params;
      const {name, price, quantity, imgUrl} = req.body;
      const sqlUpdate = "UPDATE user_db.products SET name = ?, price = ?, quantity = ?, imgUrl = ? WHERE id = ?";
      db.query(sqlUpdate, [name, price, quantity, imgUrl, id], (error, result) => {
        if (error) {
          console.log(error);
        }
        res.send("Product updated succesfuly.");
      });
    });


    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });