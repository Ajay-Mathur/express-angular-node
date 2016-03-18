var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require('body-parser')
var cors = require("cors");
mongoose.connect("mongodb://localhost/simple");

var storySchema = {
	'name': String,
	'credits' : String,
	'storyContent' : String
};

var Story = mongoose.model('Story',storySchema);

var app = express();
app.use(cors());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//save the story
app.get("/saveStory",function(req,res){
	var data = JSON.stringify(req.query);
	var data1 = JSON.parse(data);
	console.log(data1.name);
	var story = new Story(data1);
	Story.find({name:data1.name}).exec(function(err,array){
		if (err) console.log("erroe already Present");
		else
		if(array && array.length){
			res.end('{"error":"This story already exists."}');
		}else{
			story.save(function(err){
			if(err){
				res.end('{"error":"Some error or errors."}');
			}else{
				res.end('{"error":"success."}');
			}
			//res.end("h1 h1");
		})
		}
		//res.end('{"error":"New Story"}');
	})
});
//fetch the story
app.get("/seeStory",function(req,res){
	Story.find({},{storyContent:0}).exec(function(err,data){
		console.log(JSON.stringify(data))
		res.end(JSON.stringify(data));
	})
});

app.get("/pullStory",function(req,res){
	console.log("id is ",req.query.id)
	var queryId = req.query.id;
	Story.find({_id:queryId}).exec(function(err,data){
		console.log(JSON.stringify(data))
		res.end(JSON.stringify(data));
	})
});




app.listen(3002);