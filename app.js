const express = require("express");
const exhbs = require("express-handlebars");
const bdyprsr = require("body-parser");

//dotenv config
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.use(bdyprsr.urlencoded({ extended: false }));
app.use(bdyprsr.json());

// static files
app.use(express.static("public"));

// Template files
const handlebars = exhbs.create({ extname: "hbs" });
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");

// Router
// app.get('/',(req,res)=>{
//     res.render("home")
// })
const routes = require("./server/routes/students");
app.use('/', routes);


// app listening
app.listen(port, () => {
    console.log(`listening port ${port}`);
})
