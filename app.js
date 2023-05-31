const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const todolists = ["Buy Food", "Cook Food", "Eat Food"];
const workList = [];

app.get("/", function(req,res){

    let day = date.currdate();
    console.log(day);

    res.render('list', {listTitle: day, todolists: todolists});
})

app.post("/",function(req,res){

    let newitem = req.body.newItem;

    if(req.body.list === "Work"){
        workList.push(newitem);
        if(newitem === ""){
            workList.pop();
        }
        res.redirect("/work");
    }
    else{
        todolists.push(newitem);
        if(newitem === ""){
            todolists.pop();
        }
        res.redirect("/");
    }
})

app.get("/work", function(req,res){
    res.render('list',{listTitle: "Work List", todolists: workList})
})

app.get("/about", function(req,res){
    res.render('about');
})

app.listen(3000,function(){
    
    console.log("Server started at port 3000");
})