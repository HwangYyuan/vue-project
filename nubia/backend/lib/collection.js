var MongoClient=require('mongodb').MongoClient;
var DB_CONN_STR='mongodb://localhost:27017';
function collection(name,callback){
    MongoClient.connect(DB_CONN_STR,function(err,client){
        console.log('success');
        const db=client.db('dolphin');
        let collection=db.collection(name);
        callback(collection,client);
        // client.close();
    })
}
module.exports={
    collection
}