var express=require('express');
var app=express();
require('./route/route.js').registor(app);
require('./route/route.js').login(app);
require('./route/route.js').getLength(app);
require('./route/route.js').getNum(app);
app.listen(54326);