
import fs from "fs";
import {createRandomUniqueId , createSlug} from "../helpers/helper.js";

export const createProductData = (req , res) =>{
   const {name , regularPrice , salePrice , stock , colors , size , weight , brand } = req.body;
   
   const prodcutData = JSON.parse(fs.readFileSync("db/product.json").toString());

   const product = {
    id: createRandomUniqueId(),
    name , 
    slug:createSlug(name),
    regularPrice, 
    salePrice, 
    stock, 
    colors, 
    size ,
    weight,
    brand,
    photo:req.file.filename,

   }
   
   prodcutData.push(product);
   fs.writeFileSync("db/product.json" , JSON.stringify(prodcutData));
   res.redirect("/");
    
}



// create Product from;


export const createProductForm = (req , res) =>{
    res.render("create");
}

// get all product controller ;
export const getallProduct = (req , res) =>{
   
    const prodcutData = JSON.parse(fs.readFileSync("db/product.json").toString());
    res.render("productTable" ,{
        products : prodcutData,
    });
};


// Single Product Data ;
export const singleProductData = (req , res) =>{
    const {slug} =req.params;
    const prodcutData = JSON.parse(fs.readFileSync("db/product.json").toString());
    const singleProduct = prodcutData.find((data) => data.slug === slug)
    res.render("single" , {
        product : singleProduct,
        });
};


// Delete Product data from desh bord;

export const deleteProductData = (req , res) =>{
    const { id } = req.params;
    const prodcutData = JSON.parse(fs.readFileSync("db/product.json").toString());
    const updateProduct = prodcutData.filter((data) =>data.id !== id);
    fs.writeFileSync("db/product.json" ,JSON.stringify(updateProduct));
    res.redirect("/")  
}

// Edit Product data ;

export const editProductData = (req , res) =>{
    const {id} = req.params;
    // get all product;
    const prodcutData = JSON.parse(fs.readFileSync("db/product.json").toString());
    // Find dingleProduct;
    const editProduct = prodcutData.find((data) =>data.id === id);
    res.render("edit", {
        product : editProduct,
    });
};


// Update Product Data here;
export const updateProductData = (req , res) =>{
    const { id } = req.params;
    const { name , regularPrice , salePrice , stock , colors , size , weight , brand } = req.body;

    // get all product;
    const prodcutData = JSON.parse(fs.readFileSync("db/product.json").toString());

    // Photo manage;
    let photoName = prodcutData[prodcutData.findIndex((data) =>data.id === id)].photo;
    if(req?.file?.filename){
        photoName = req.file.filename;
    };

    prodcutData[prodcutData.findIndex((data) =>data.id === id)] = {
        id : id,
        slug : createSlug(name),
        name, 
        regularPrice,
        salePrice,
        stock,
        colors,
        size,
        weight,
        brand,
        photo :photoName,
    },

    fs.writeFileSync("db/product.json" , JSON.stringify(prodcutData));
    res.redirect("/");
}
