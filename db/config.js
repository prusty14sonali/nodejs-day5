const {MongoClient}= require('mongodb')
const MongoUrl = 'mongodb://127.0.0.1:27017/'

//connection to database
//previously mongodb has 2 connection string format mongodb+srv:// mongodb://
const client = new MongoClient(MongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true //unwantedly wont perform anything. only default things will be performed
})
module.exports = client;