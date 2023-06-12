const express = require('express')
//Object destructing - its needed to access mongodb
//const {MongoClient}= require('mongodb')
const bodyparser = require('body-parser')
const objectId = require("mongodb").ObjectId;
const client = require('./db/config')
const app = express();
const port = 3030;
//express middleware section ---it has to be put in top section
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json())
let db;
client.connect((dbconnectionerror,connection)=>{
    if(dbconnectionerror){
         response.send({
             status: 500, 
             message: "db connection error"
         })
        // console.log(dbconnectionerror)
        // throw dbconnectionerror
    }
    else{
        db = connection.db("zomatodb")
        app.listen(port,()=>{
            console.log('server started on port ',port)
        })
    }
})
app.get('/',(req,res)=>{
    res.send("welcome to node js to fetch order details")
})
//getorderdetails end point
app.get('/getorderdetails',(request,response)=>{
    if(db){
        db.collection('orderdetails').find().toArray((err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                response.send(result)
            }
        })
    }
            
        
    })
app.post('/addorderdetails',(request,response)=>{
    if(db){
        db.collection("orderdetails").insertOne(request.body,(err, result) => {
            if (err) {
              console.log(err);
            } else {
              response.send("order details added successfully");
            }
          });
    }
})

app.put('/updateorderdetails',(request,response)=>{
    if(db){
            db.collection("orderdetails").updateOne({_id: objectId(request.body._id)},{$set:{price:request.body.price,
            resturant:request.body.resturant}},request.body,(err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  response.send("order details updated successfully");
                }
              });
    }
})

app.delete('/deleteorderdetails',(request,response)=>{
    if(db){
            db.collection("orderdetails").remove({_id: objectId(request.body._id)},(err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  response.send("order details deleted successfully");
                }
              });
    }

})

