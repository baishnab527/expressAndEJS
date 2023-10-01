import colors from "colors";
import dotenv from "dotenv";
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import productRouter from "./routes/product.js";


// environment setup here;
dotenv.config();

// PORT config here;
const PORT = process.env.PORT || 5052;

// init express ;
const app = express();

// add middleware support here;
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended : false}));

// add static folter;
app.use(express.static("public"));

// add ejs set up ;
app.set("view engine" , "ejs");
app.use(expressEjsLayouts);



// add api router;
app.use(productRouter);




// listen server;
app.listen(PORT, () =>{
    console.log(`The server is running on port ${PORT}`.bgGreen.black);
});