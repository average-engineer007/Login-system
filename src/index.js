const express=require("express")
const path = require("path")
const app = express()
const hbs=require("hbs")
// const collections = require("./mongodb")
const Pool = require('pg').Pool
const crypto = require("crypto");

const pool = new Pool({
  host: 'aws-0-ap-south-1.pooler.supabase.com',
  user: 'database-user', 
  database: 'postgres',
  port: '5432',
  user: 'postgres.faybqrytjcdbdjthxuec',
  password: 'ocs_database#m24'

})




const templatePath=path.join(__dirname,'../templates')

app.use(express.json())
app.set("view engine","hbs")
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))


app.get("/",(req,res)=>{
    res.render("login")
})

// app.get("/signup",(req,res)=>{
//     res.render("signup")
// })


// app.post("/signup",async(req,res)=>{
// const data={
//     name:req.body.name,
//     password:req.body.password
// }
// await collections.insertMany([data])
// res.render("home")
// })

app.post("/login",async(req,res)=>{
    try {
        const query = 'SELECT * FROM users WHERE userid = $1';
        const { rows } = await pool.query(query, [req.body.userid]);
        if (rows.length === 0) {
            return res.send("User not found");
        }
        const user = rows[0];
        const role=user.role;
        // Hashing the password provided by the user
        // const hashedPassword = req.body.password;
        // const hashedPassword = crypto.createHash('md5').update(req.body.password).digest('hex');
        
        if (user.password_hash === req.body.password) {
            // res.render("home", { username: user.userid });
            if(role==="basic"){
            res.send(user.userid);}
            else{
                const allUsernamesQuery = 'SELECT userid FROM users';
                const allUsernames = await pool.query(allUsernamesQuery);
                const usernames = allUsernames.rows.map(row => row.userid);
                res.send(usernames);
            }
        } 
        else {
            res.send(hashedPassword);
        }
    } 
    catch (error) {   
        console.error(error);
        res.status(500).send("Server error");
    }
    })

app.post("/home",(req,res)=>{
    if(role==='basic'){
        res.send("basic hai bhai");
    }
    else{
        res.send("admin hai bhai"); 

    }
})
    


app.listen(3000,()=>{
    console.log("port connected")
})



