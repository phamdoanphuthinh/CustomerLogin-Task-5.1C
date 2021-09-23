const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const Customer = require("./models/Customer")
const mongoose= require("mongoose")
const validator = require("validator")
const app = express()
const bcrypt = require('bcrypt');
const { send } = require("process")
const saltRounds = 10;
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/custsignup.html")
})

mongoose.connect("mongodb+srv://admin-doanphuthinhpham:phuthinh2009@cluster0.vl3sl.mongodb.net/Customer?retryWrites=true&w=majority",{useNewUrlParser: true})

app.post('/', (req,res,)=>{

    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const country_residence = req.body.country_residence
    const password= req.body.password
    if(req.body.re_password == req.body.password){
    const re_password = req.body.password}
    else{
        res.status(400).send({message:"Confirm password should match with password!"})
    }
    const address= req.body.address
    const city= req.body.city
    const state= req.body.state
    const zip= req.body.zip
    const mobile_phone= req.body.mobile_phone
    
    bcrypt.hash(password, saltRounds, function(err, hash){

    const customer = new Customer(
        {
            firstname : firstname,
            lastname : lastname,
            email : email,
            country_residence: country_residence,
            password: hash,
            re_password:hash,
            address: address,
            city: city,
            state: state,
            zip: zip,
            mobile_phone: mobile_phone
        })
        
    
customer
.save()
.catch((err) => console.log(err))
    
if (res.statusCode === 200)
        {
            res.sendFile(__dirname + "/index.html")
        }
else
{
            
            res.sendFile(__dirname + "/404.html")
}
})
})
app.get('/index', (req, res)=>
{
    res.sendFile(__dirname + "/index.html")})


app.post('/index', (req, res) => {
    const inputEmail = req.body.inputEmail
    const inputPassword = req.body.inputPassword
	Customer.findOne({email:inputEmail}, function(err,data){
        if(!data)
        {
            console.log("Not existing email!")
            res.status(400).send({message: "This email is not existing!"})
        }
        else{ 
	bcrypt.compare(inputPassword, data.password, function(err, result){
        if(!result)
        {
            console.log("Login unsuccessfully!")
            res.status(400).send({message: "Password is wrong!"})
        }
        else{
            console.log("Login successfully!")
            res.sendFile(__dirname + "/custtask.html")
        }
    })
}})
})
        
    
let port = process.env.PORT;
if (port == null || port == "")
{
    port = 8080;
}

app.listen( port,(req,res) =>{
    console.log("Server is running successfully!")
})
