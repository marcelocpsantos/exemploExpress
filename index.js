const express =require("express")

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1marcelo',
  database: 'teste',
});

const app=express()
app.use(express.static('view'))
app.use(express.json())
app.get("/",(req,res)=>{res.sendFile(__dirname+"/view/index.html")})

app.get("/pessoa",(req,res)=>{
      const sql='SELECT * FROM pessoa'
      connection.query(sql, (err, results, fields) => {
        res.status(200).send(results)
      });
})

app.put("/pessoa",(req,res)=>{
  novo=req.body
  const sql='UPDATE pessoa SET nome="'+novo.nome+'", idade='+novo.idade+' WHERE id = '+novo.id;
  console.log(sql) 
  connection.query(sql, (err, results, fields) => {
    if(err) res.status(400).send(err)
    else res.status(200).send(results)
  }); 
})
app.post("/pessoa",(req,res)=>{
  novo=req.body
  const sql='INSERT INTO pessoa (id, nome, idade) VALUES (NULL, "'+novo.nome+'", '+novo.idade+'); ';
  console.log(sql) 
  connection.query(sql, (err, results, fields) => {
    if(err) res.status(400).send(err)
    else res.status(200).send(results)
  }); 
})

app.delete("/pessoa/:id",(req,res)=>{
  const sql='DELETE FROM pessoa WHERE id='+req.params.id
  connection.query(sql, (err, results, fields) => {
    if(err) res.status(400).send(err)
    else res.status(200).send(results)
  }); 
})

app.listen(8080,()=>{
    console.log("\n\n escutando a porta 8080")
})