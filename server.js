/*express is nodejs backend framework*/
var express = require('express');
var app = express();
var mongojs = require('mongojs');
db = mongojs ('groupList',['groupList']);
var bodyParser = require('body-parser');
/* Test to check server
app.get('/',function(req,res){
	res.send("hello numak from server.js")
});
*/
/*static files made available*/
app.use(express.static(__dirname + '/public/html'));	
app.use(express.static(__dirname + '/public/images'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/controllers'));
app.use(bodyParser.json());

app.get('/groupList',function(req, res) { 
	console.log("Got a GET request");

	db.groupList.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});

});

app.post('/groupList',function(req,res){
	console.log(req.body);

	db.groupList.insert(req.body,function(err,doc){
		res.json(doc);	
	});

});

app.delete('/groupList/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.groupList.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});


app.get('/groupList/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.groupList.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.put('/groupList/:id',function(req,res){
	var id = req.params.id;
	console.log(req.body.name);
	db.groupList.findAndModify({query: {_id: mongojs.ObjectId(id)},
	update: {$set: {groupNumber: req.body.groupNumber, groupDescription: req.body.groupDescription, subGrouup: req.body.subGroup, 
	category: req.body.category, subCategory: req.body.subCategory}},
	 new: true}, function(err,doc){
	 	res.json(doc);
	 });

	});

/*Server on localhost port 3000 */	
app.listen(3000);
console.log("server running on port 3000");		