const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

const port = 5000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "students"
})

app.post('/add_user', (req, res)=>{
    sql = "INSERT INTO student_details (`name`, `email`, `gender`, `age`) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.gender,
        req.body.age
    ]
    db.query(sql, values, (err, result)=>{
        if(err){
            return res.json(500).send({message: "Somthing unexpected has occured"})
        }else{
            return res.json(200).send({success:"Student added successfully"})
        }
        
    })
})

app.get("/students", (req, res)=>{
    sql = "SELECT * FROM student_details";
    db.query(sql, (err, result)=>{
        if(err){
            return res.json({message: "Server error"})
        }else{
            return res.json(result)
        }
            
    })
})

app.get("/get_students/:id", (req, res)=>{
    const id = req.params.id;
    sql = "SELECT * FROM student_details WHERE id=?";
    db.query(sql, [id], (err, result)=>{
        if(err){
            return res.json({message: "Server error"})
        }else{
            return res.json(result)
        }
            
    })
})

app.post("/update_student/:id", (req, res)=>{
    const id = req.params.id;
    sql = "UPDATE student_details SET `name`=?, `email`=?, `gender`=?, `age`=? WHERE id=?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.gender,
        req.body.age, id
    ]
    db.query(sql, values, (err, result)=>{
        if(err){
            return res.json({message: "Server error"})
        }else{
            return res.json(result)
        }
            
    })
})

app.get("/delete_student/:id", (req, res)=>{
    const id = req.params.id;
    sql = "DELETE FROM student_details WHERE id=?";
    db.query(sql, [id], (err, result)=>{
        if(err){
            return res.json({message: "Server error"})
        }else{
            return res.json({message: "User delete successfully."})
        }
            
    })
})


app.listen(port, ()=>{
    console.log("listening...!");
});