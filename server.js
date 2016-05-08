var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require('body-parser')
var cors = require("cors");
var db_name = "blog";
mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

mongoose.connect(mongodb_connection_string);
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var schema = mongoose.Schema;
var blogSchema = new schema({
	'title' : String,
	'date' : Date,
	'highlight' : String,
	'articleData' : String,
	'likes' : String,
	'tags' : String
});
var passSchema = new schema({
	'pass' : String
})
var Blog = mongoose.model('article',blogSchema);
var Passcode = mongoose.model('passcodes',passSchema)
var app = express();
app.use(cors());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//save the Blog
app.get('/getTopStories',function(req,res){
	var data = {
		"title" : "hello"
	}
	Blog.find(function(err,records){
		if(err){
			var data = [{"title":"Site is under maintainence."}];
		}else{
			data = records;
			console.log(err);
			console.log("data : "+records);
			res.json(data);	
		}
		
	});
	
});

app.get('/saveTest',function(req,res){
	var testData = new Blog({'title':'testing data'});
	testData.save(function(err){
		if(err){
			console.log("Error "+err)
		}else{
			console.log("saved");
		}
		res.end("hello");
	});
});

app.get("/saveBlog",function(req,res){
	var data = JSON.stringify(req.query);
	var data1 = JSON.parse(data);
	//console.log(data1.name);
	//var pass = data1.passcode;
	//var passData = new pass('pass');
	Passcode.find().exec(function(err,data){
		console.log(err);
		console.log(data[0].pass);
		if(data1.passcode == data[0].pass){
			var Blog1 = new Blog(data1);
			Blog1.save(function(err){
				if(err){
					res.end('{"error":"Some error or errors."}');
				}else{
					res.end('{"error":"success."}');
				}
				//res.end("h1 h1");
			})
		}else{
			res.end('{"error":"Wrong passcode"}');
		}
	});
	//console.log(cursor.pass);
		
		//res.end('{"error":"New Blog"}');
});
//fetch the Blog
app.get("/seeStory",function(req,res){
	Blog.find({},{storyContent:0}).exec(function(err,data){
		console.log(JSON.stringify(data))
		res.end(JSON.stringify(data));
	})
});

app.get("/pullStory",function(req,res){
	console.log("id is ",req.query.id)
	var queryId = req.query.id;
	Blog.find({_id:queryId}).exec(function(err,data){
		console.log(JSON.stringify(data))
		res.end(JSON.stringify(data));
	})
});

server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + port )
});