const express = require("express"); // Importa ExpressJS. Más info de Express en =>https://expressjs.com/es/starter/hello-world.html
const app = express(); // Crea una instancia de ExpressJS
const cors = require("cors");
const jwt = require("jsonwebtoken");
const sha256 = require("sha256");
const fs = require('fs');
const connection = require('./persistencia/connection'); // requiere la variable connection del archivo connection.js
const port = 3000;
const secret = '622c12fb446b491f56ab32b63de9d02f7c0715fb0d9b82762bae096408c21f6ee4bd152b4d2fa0a82e5e47b635a331658c48c0983fef7c96f99467d4b814ee3c';
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));// Permite que el servidor analice el cuerpo de las peticiones como JSON
app.use(cors({
    origin: '*'
}));
app.use('/images',express.static('images'));
app.use('/img',express.static('img'));
app.use(express.static('public'));

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
    let filters = "";
    if(req.query.filters){
        filters = req.query.filters;
    }else{
        filters = " order by soldCount desc";
    }
    connection.query('SELECT * from ProductByCategory'+filters,(err, rows)=>{
        if (err) throw err;
        res.send(rows);
    })
});

app.get("/products/:categoryid",(req,res) =>{
    let filters = "";
    if(req.query.filters){
        filters = req.query.filters;
    }else{
        filters = " order by soldCount desc";
    }
    connection.query(`SELECT * FROM ProductByCategory WHERE idCategory="${req.params.categoryid}"`+filters,(err, rows)=>{
        if (err) throw err;
        res.send(rows);
    })
});

app.post("/products/:categoryid", async (req, res) => {
    let relatedproducts = await randomrelatedproducts(req.params.categoryid);
    connection.getConnection((err,connection)=>{
        connection.query(`INSERT INTO Products(name, description, cost, currency, soldCount) VALUES ("${req.body.name}","${req.body.description}",${req.body.cost},"${req.body.currency}",${req.body.soldCount})`, (err,result)=>{
            if (err){
                res.sendStatus(err)}
                else{
                   connection.query("SELECT LAST_INSERT_ID()",(err,result)=>{
                       connection.query(`INSERT INTO Category_Product VALUES (${req.params.categoryid},${Object.values(result[0]).join(",")})`,(err,result)=>{
                           if (err) throw err;
                       })
                       relatedproducts.forEach(element => {
                           connection.query(`INSERT INTO relatedProducts VALUES (${Object.values(result[0]).join(",")},${element.id})`,(err,result)=>{
                               if (err) throw err;
                           })
                       })
                       res.json(Object.values(result[0]).join(","));
                   })
                   
                }
           })
    connection.release();
    });
    app.post("/productimage",(req,res)=>{
        let imageBuffer = Buffer.from(req.body.image, "base64");
        fs.writeFileSync(`./img/${req.body.name}.png`,imageBuffer);
        connection.query(`INSERT INTO ProductImages VALUES (${req.body.productid},"img/${req.body.name}.png")`,(err,result)=>{
            if (err) throw err;
            res.json(result);
        })
    })
});
app.get("/test",async(req,res)=>{
    let lukitas = await randomrelatedproducts(101);
    console.log(lukitas.length);
    res.json(lukitas);
})
function randomrelatedproducts(categoryid){
    return new Promise((resolve,reject)=>{
        connection.query(`select id from productbycategory where idcategory=${categoryid} order by rand() limit 0,2`,(err,result)=>{
            if (err) reject(err);
            if(result.length > 0){
                resolve(result);
            }else{
                connection.query(`select id from productbycategory where idcategory=102 order by rand() limit 0,2`,(err,result)=>{
                    resolve(result)
                })
            }
        })
    })
}
app.get("/productinfo/:id",(req,res)=>{
    connection.query(`SELECT * FROM ProductInfo WHERE id=${req.params.id}`, (err,result)=>{
        if(err) throw err;
        res.json(result);
    })
});

app.post("/comments",authenticateToken,(req,res)=>{
    connection.query(`SELECT username FROM USERS WHERE email="${req.user.email}"`,(err,result)=>{
        if (err) throw err;
        if(result){
            connection.query(`INSERT INTO Comments(idproduct, score, description, user, dateTime) VALUES(${req.body.product}, ${req.body.score},"${req.body.description}","${result[0].username}","${req.body.dateTime}")`,(err,result)=>{
                if (err) throw err;
                res.send(result);
            }
            )
        }
    })
});

app.get("/comments/:id",(req,res)=>{
    connection.query(`SELECT * FROM commentswithimage WHERE idproduct=${req.params.id}`,(err,result)=>{
        if (err) throw err;
        res.send(result);
    })
});

app.post("/register",(req,res)=>{
    connection.query(`INSERT INTO USERS(email, username, password) VALUES ("${req.body.email}","${req.body.username}","${sha256(req.body.password)}")`,(err,result)=>{
        if (err) throw err;
        res.send(result);
    })
})

app.get("/username/:email",(req,res)=>{
    connection.query(`SELECT username FROM USERS WHERE email="${req.params.email}"`,(err,result)=>{
        if (err) throw err;
        res.send(result);
    })
})

app.get("/verify",authenticateToken,(req,res)=>{
    if(req.user){
        res.json(req.user.email);
    }else
    res.send(400);
})

app.post("/login",checkUser,(req,res)=>{ 
    let token = generateAccessToken(req.body.email, req.body.password);
    res.json(token);
});

function checkUser(req,res,next){
    connection.query(`SELECT * FROM Users WHERE password="${sha256(req.body.password)}" AND email="${req.body.email}"`,(err, result)=>{
        if (err) throw err;
            if (result.length == "1"){
                next();
            }else{
                res.sendStatus(404);
            }
        })
    }

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
          return res.sendStatus(401);
    }
        const result = verifyAccessToken(token);
      
        if (!result.success) {
          return res.status(403).json("token expirado");
    }
        req.user = result.data;
        next();
      }

function generateAccessToken (email, password) {
    const payload = {
      email: email,
      password: password
    };
    
    const options = { expiresIn: '3h' };
    return jwt.sign(payload, secret, options);
  }

function verifyAccessToken(token) {
    try {
      const decoded = jwt.verify(token, secret);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

app.get("/users",authenticateToken,(req,res)=>{
    connection.query(`SELECT * FROM Users WHERE email="${req.user.email}" AND password="${sha256(req.user.password)}"`,(err, result)=>{
        if (err) throw err;
        res.json(result);
    })
})
app.put("/users",authenticateToken,(req,res)=>{
    let user = req.body;
    let imageBuffer = Buffer.from(user.image, "base64");
    fs.writeFileSync(`./images/${req.body.username}.png`,imageBuffer);
    connection.query(`UPDATE Users SET username="${user.username}",name="${user.name}",secondname="${user.secondname}",surname="${user.surname}",secondsurname="${user.secondsurname}",phone="${user.phone}",address="${user.address}",image="${user.username}.png" where email="${req.user.email}"`,(err,result)=>{
        if (err) throw err;
        res.json(result);
    })
})

app.post("/cart",authenticateToken,(req,res)=>{
     connection.query(`INSERT INTO users_products(emailUser, idProduct) values("${req.user.email}","${req.body.productid}")`,(err,result)=>{
        if (err){
            if(err.errno == "1062"){
                res.json("Entrada duplicada");
            }
        };
        res.json(result);
    })
})

app.get("/cart",authenticateToken,(req,res)=>{
    connection.query(`SELECT * FROM users_products where emailUser="${req.user.email}"`,(err,result)=>{
        if(err) throw err;
        res.json(result);
    })
})

app.put("/cart/:idproduct",authenticateToken,(req,res)=>{
    connection.query(`UPDATE users_products SET productCount="${req.body.productcount}" where idProduct="${req.params.idproduct}" AND emailUser="${req.user.email}"`,(err, result)=>{
        if (err) throw err
        res.json(result);
    })
})

app.delete("/cart/:idproduct",authenticateToken,(req,res)=>{
    connection.query(`DELETE from users_products WHERE idProduct="${req.params.idproduct}" AND emailUser="${req.user.email}"`,(err, result)=>{
        if (err) throw err;
        res.json(result);
    })
})



















app.listen(port, ()=>{
    console.log(`Servidor corriendo en http://localhost:${port}`);
});