//Var reqs

var express= require("express");
var app = express();
var bodyParser = require("body-parser");

//mongoose setup

const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://rjdc1991:chico55@cluster0-bsgvg.mongodb.net/test?retryWrites=true&w=majority",{
	
	useNewUrlParser: true,
	useCreateIndex:true
}).then(() => {
  	console.log('Connected to MongoDB DB');
})
	.catch(error => {
		console.log(error.message);
});

//app.set app.use 

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

//define to-do schema and variable

var toDoSchema = new mongoose.Schema({
	
	name: String,
	
	author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
 username: String
  
}});
	


var toDoList = mongoose.model("toDoList", toDoSchema);


//routes

app.get("/", function(req,res){
	
	toDoList.find({}, function(err,toDoList){
		
		if(err){
			
			console.log(err);
		}else{
			
			res.render("index", {toDoList:toDoList});
		}
	});
});

app.post("/newToDo", function(req,res){
	
	console.log("new item added");
	var newItem = new toDoList ({
		
		name: req.body.item
	});
	
	toDoList.create(newItem,function(err,toDoList){
		
		if(err){
			console.log(err);
		}else{
			
			console.log("inserted " + newItem.name);
		}
	});
	
	res.redirect("/");
});


app.delete("/:id", function(req,res){
	
	toDoList.findByIdAndRemove(req.params.id, function(err){
		
		
	if(err){
		
		console.log(err);
		
		res.redirect("/");
		
	}else{
		
		res.redirect("/");
	}

	});
});

//app.listen
app.listen(process.env.PORT || 3000, () => {
	console.log("running");
});