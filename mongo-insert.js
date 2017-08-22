var mongo=require('mongodb');
var dbHost = '127.0.0.1';
var dbPort = 27017;

//Normal mongo approach
/*var Db = mongo.Db;
var Connection = mongo.Connection;
var Server = mongo.Server;
var db = new Db ('local', new Server(dbHost, dbPort), {safe:true});

db.open(function(error, dbConnection){
if (error) {
console.error(error);
process.exit(1);
}
console.log('db state: ', db._state);
item = {
name: 'Sachin'
}
dbConnection.collection('test').insert(item, function(error, item){
if (error) {
console.error(error);
process.exit(1);
}
console.info('created/inserted: ', item);
db.close();
process.exit(0);
});
});*/

//using MongoSkin 

var mongoskin = require('mongoskin');
var db = mongoskin.db(dbHost + ':' + dbPort + '/local', {safe:true});

db.bind('local', {
findOneAndAddText : function (text, fn) {
db.collection('local').findOne({}, function(error, item){
if (error) {
console.error(error);
process.exit(1);
}
console.info('findOne: ', item);
item.text = text;
var id = item._id.toString(); // we can store ID in a string
console.info('before saving: ', item);
db.collection('local').save(item, function(error, count){
console.info('save: ', count);
return fn(count, id);
});
})
}
});



