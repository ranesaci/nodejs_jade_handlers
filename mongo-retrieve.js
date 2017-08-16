var mongo=require('mongodb');
var dbHost = '127.0.0.1';
var dbPort = 27017;

var Db = mongo.Db;
var Connection = mongo.Connection;
var Server = mongo.Server;
var db = new Db ('local', new Server(dbHost, dbPort), {safe:true});

db.open(function(error, dbConnection){
if (error) {
console.error(error);
process.exit(1);
}
console.log('db state: ', db._state);

dbConnection.collection('test').findOne({}, function(error, item){
if (error) {
console.error(error);
process.exit(1);
}
console.info('retrived: ', item);

});
console.log('******************************************');
dbConnection.collection('test').findOne({}, function(error, item){
if (error) {
console.error(error);
process.exit(1);
}
console.info('retrived before: ', item);
console.log('Modify the item object');

item.text= 'added test to item123';
var id=item._id.toString();
console.info('before saving: ', item);
dbConnection.collection('test').save(item, function (error, item) {
	if(error){
		console.error(error);
		process.exit(1);
	}
	console.info('item inserted with modification');
});

//retrive with id
dbConnection.collection('test').find({_id: new mongo.ObjectID(id)}).toArray(function (error, items) {
	
	if(error){
		console.error(error);
		process.exit(1);
	}
	console.info('Items:', items);
	
	process.exit(0);
	
	
});


});


});

