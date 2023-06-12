const express = require('express')
//Object destructing - its needed to access mongodb
const {MongoClient}= require('mongodb')
//ES5 usage of mongo client
//const mongoclient = require('mongodb').mongoclient
// const employee = {
//     name:"Sonali",
//     address:"Bhubaneswar"
// }
const app = express()
const MongoUrl = 'mongodb://127.0.0.1:27017/'
const port = 4002;
const bodyparser = require('body-parser')
const objectId = require("mongodb").ObjectId;
//connection to database
//previously mongodb has 2 connection string format mongodb+srv:// mongodb://
const client = new MongoClient(MongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true //unwantedly wont perform anything. only default things will be performed
})
//express middleware section ---it has to be put in top section
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json())
app.get('/',(req,res)=>{
    res.send("welcome to node js to fetch order details")
})
//getorderdetails end point
app.get('/getorderdetails',(request,response)=>{
    client.connect((dbconnectionerror,connection)=>{
        if(dbconnectionerror){
             response.send({
                 status: 500, message: "db connection error"
             })
            // console.log(dbconnectionerror)
            // throw dbconnectionerror
        }
        else{
            const db = connection.db("zomatodb")
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
})
app.post('/addorderdetails',(request,response)=>{
    client.connect((dbconnectionerror,connection)=>{
        if(dbconnectionerror){
             response.send({
                 status: 500, message: "db connection error"
             })
            // console.log(dbconnectionerror)
            // throw dbconnectionerror
        }
        else{
            const db = connection.db("zomatodb");
            db.collection("orderdetails").insertOne(request.body,(err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  response.send("order details added successfully");
                }
              });
        }
    })
})

app.put('/updateorderdetails',(request,response)=>{
    client.connect((dbconnectionerror,connection)=>{
        if(dbconnectionerror){
             response.send({
                 status: 500, message: "db connection error"
             })
            // console.log(dbconnectionerror)
            // throw dbconnectionerror
        }
        else{
            const db = connection.db("zomatodb");
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
        

})

app.delete('/deleteorderdetails',(request,response)=>{
    client.connect((dbconnectionerror,connection)=>{
        if(dbconnectionerror){
             response.send({
                 status: 500, message: "db connection error"
             })
            // console.log(dbconnectionerror)
            // throw dbconnectionerror
        }
        else{
            const db = connection.db("zomatodb");
            db.collection("orderdetails").remove({_id: objectId(request.body._id)},(err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  response.send("order details deleted successfully");
                }
              });
        }
    })
        

})

app.listen(port,()=>{
    console.log('server started on port ',port)
})