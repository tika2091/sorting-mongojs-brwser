var express=require("express");
var mongojs=require("mongojs");

// initialize express
var app= express();


var databaseUrl="drinks";
var collections=["soda"];

// use mongojs to hook database to the db variable
var db = mongojs(databaseUrl, collections);


db.on("error", function(error){
	console.log("Database Error:", error);

});


app.get("/",function(err,res){
	res.send("hello world");
	console.log();
});



// at the "/all" path, display every entty to soda collection
app.get("/name",function(err,res){
	db.soda.find({},function(err, found){
		if (err){
			console.log(err);
		}
		else{
			res.json(found);
		}
	});
});



app.get("/size",function(err,res){
	db.soda.find().sort({size:1},function(err, found){
		if (err){
			console.log(err);
		}
		else{
			res.json(found);
		}
	});
});



app.listen(3000,function(){
	console.log("listening to port 3000!");
});
