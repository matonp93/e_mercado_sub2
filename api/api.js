const express = require("express"); // Importa ExpressJS. Más info de Express en =>https://expressjs.com/es/starter/hello-world.html
const app = express(); // Crea una instancia de ExpressJS
const cors = require("cors");
const connection = require('./persistencia/connection'); // requiere la variable connection del archivo connection.js
const port = 3000;

app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON
app.use(cors({
    origin: '*'
}));

app.get("/", (req,res) =>{
    res.send("Api online");
});

app.get("/categories",(req,res) =>{
    connection.query('SELECT * from Categories',(err, rows)=>{
        if (err) throw err;
        res.send(rows);
    })
});
app.get("/categories/:id",(req,res) =>{
    connection.query(`SELECT * FROM Categories WHERE id=${req.params.id}`,(err, rows)=>{
        if (err) throw err;
        res.send(rows);
    })
});

app.post("/categories", (req, res) => {
    let columns, values;
    columns = Object.getOwnPropertyNames(req.body).join(',');
    values = Object.values(req.body).map(x => JSON.stringify(x)).join(',');
   connection.query(`INSERT INTO Categories(${columns}) VALUES (${values})`, (err,result)=>{
      if (err) res.sendStatus(err);
      res.send(result);
    })
});

app.get("/products",(req,res) =>{
    connection.query('SELECT * from ProductByCategory',(err, rows)=>{
        if (err) throw err;
        res.send(rows);
    })
});

app.get("/products/:categoryid",(req,res) =>{
    connection.query(`SELECT * FROM ProductByCategory WHERE idCategory=${req.params.categoryid}`,(err, rows)=>{
        if (err) throw err;
        res.send(rows);
    })
});

app.post("/products/:categoryid", (req, res) => {
     connection.query(`INSERT INTO Products VALUES (${req.body.id},"${req.body.name}","${req.body.description}",${req.body.cost},"${req.body.currency}",${req.body.soldCount})`, (err,result)=>{
     if (err) res.sendStatus(err);
      res.send(result);
    })
    connection.query(`INSERT INTO Category_Product VALUES (${req.params.categoryid},${req.body.id})`,(err,result)=>{
        if (err) throw err;
    })
    req.body.images.forEach(element => {
        connection.query(`INSERT INTO ProductImages VALUES (${req.body.id},"${element}")`,(err,result)=>{
            if (err) throw err;
        })
    });
    req.body.relatedProducts.forEach(element => {
        connection.query(`INSERT INTO relatedProducts VALUES (${req.body.id},${element.id})`,(err,result)=>{
            if (err) throw err;
        })
    })
});

app.get("/productinfo/:id",(req,res)=>{
    connection.query(`SELECT * FROM ProductInfo WHERE id=${req.params.id}`, (err,result)=>{
        if(err) throw err;
        res.json(result);
    })
});

app.post("/comments",(req,res)=>{
    connection.query(`INSERT INTO Comments(idproduct, score, description, user, dateTime) VALUES(${req.body.product}, ${req.body.score},"${req.body.description}","${req.body.user}","${req.body.dateTime}")`,(err,result)=>{
        if (err) throw err;
        res.send(result);
    }
    )
});

app.get("/comments/:id",(req,res)=>{
    connection.query(`SELECT * FROM Comments WHERE idproduct=${req.params.id}`,(err,result)=>{
        if (err) throw err;
        res.send(result);
    })
});


























app.listen(port, ()=>{
    console.log(`Servidor corriendo en http://localhost:${port}`);
});