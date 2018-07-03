var mongo = require('../lib/collection.js')

function registor(app){
    app.get('/registor',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
        mongo.collection('user',function(collection,client){
            new Promise((resolve,reject)=>{
                collection.find({
                    phone:req.query.phone*1
                }).toArray(function(err,result){
                    if(err){
                        console.log('Error:'+err);
                        return;
                    }
                    resolve(result);
                })
            }).then((result)=>{
                if(result[0]==null){
                    collection.insert(req.query,function(err,result){
                        if(err){
                            console.log('Error:'+err);
                            return;
                        }
                        res.send('success');
                    })
                }else{
                    collection.find({
                        phone:req.query.phone
                    },function(err,result){
                        if(err){
                            console.log('Error:'+err);
                            return;
                        }
                        res.send('用户已存在');
                    })
                }
            })
        })//mongo
    })//app.get
}//registor

function getLength(app){
    app.get('/getLength',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
     mongo.collection('car',function(collection,client){
            // console.log(collection)
            // console.log(req.query.type)
            collection.find().toArray(function(err, result){
                if(err) {
                    console.log('Error:' + err);
                    return;
                }
                // console.log(result);
                res.send(result);
                client.close();
            });
        })
    })
}

function login(app){
    app.get('/login',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
        console.log(req.query)
        mongo.collection('user',(collection,client)=>{
            new Promise((resolve,reject)=>{
                collection.find({
                phone:req.query.userNum*1,
                password:req.query.password*1
                }).toArray(function(err,result){
                    if(err){
                        console.log('Error:'+err);
                        return;
                    }
                    resolve(result);
                })
            }).then((result)=>{
                console.log(result[0])
                if(result[0]){
                    res.send('登录成功');
                }else{
                    res.send('fail');
                }
            })
        })//mongo
    })//app.get
}//login

function getNum(app){
    app.get('/getNum',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
        mongo.collection('car',function(collection,client){
            // console.log(req.query,type);
            if(req.query.type=='reduce'){
                collection.update({
                    id:req.query.id
                },{
                    $set:{
                        qty:req.query.qty
                    }
                })
            }//reduce
            if(req.query.type=='add'){
                collection.update({
                    id:req.query.id
                },{
                    $set:{
                        qty:req.query.qty
                    }
                })
            }//add
            if(req.query.type=='del'){
                new Promise((resolve,reject)=>{
                    collection.remove({
                        id:req.query.id
                    },function(err,result){
                        if(err){
                            console.log('Error'+err);
                            return;
                        }
                        resolve(result)
                    })
                }).then((result)=>{
                    collection.find().toArray(function(err,result){
                        if(err){
                            console.log('Error'+err);
                            return;
                        }
                        res.send(result);
                    })
                })
               // res.send(result);
            }
        })//mongo
    })//app.get
}//getNum
module.exports={
    registor,
    login,
    getLength,
    getNum
}